import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { sessionToken, ...onboardingData } = data
    
    // Session-ID aus Token holen, falls vorhanden
    let sessionId = null
    if (sessionToken && supabase) {
      try {
        const { data: session } = await supabase
          .from('onboarding_sessions')
          .select('id')
          .eq('token', sessionToken)
          .single()
        
        if (session) {
          sessionId = session.id
        }
      } catch (error) {
        console.warn('Konnte Session-ID nicht abrufen:', error)
        // Session-ID ist optional, Webhook wird trotzdem gesendet
      }
    }
    
    // Webhook URL - alle Daten werden direkt an n8n gesendet
    const webhookUrl = process.env.N8N_WEBHOOK_CUSTOMER_ONBOARDING
    
    if (!webhookUrl) {
      console.error('❌ N8N_WEBHOOK_CUSTOMER_ONBOARDING Umgebungsvariable nicht gesetzt')
      return NextResponse.json(
        { 
          success: false, 
          message: 'Webhook-URL nicht konfiguriert' 
        },
        { status: 500 }
      )
    }
    
    // Daten für Webhook formatieren
    const webhookData = {
      timestamp: new Date().toISOString(),
      type: 'customer_onboarding',
      sessionId: sessionId,
      sessionToken: sessionToken || null,
      
      // Projektidentifikation
      project: {
        reference: onboardingData.projectReference,
        scope: onboardingData.projectScope,
        contractType: onboardingData.contractType,
        plannedStart: onboardingData.plannedStart,
        agreedDeadline: onboardingData.agreedDeadline,
        briefing: onboardingData.projectBriefing,
        techStack: onboardingData.techStack,
        deadline: onboardingData.projectDeadline
      },
      
      // Unternehmensdaten
      company: {
        name: onboardingData.companyName,
        legalForm: onboardingData.legalForm,
        vatId: onboardingData.vatId,
        commercialRegister: onboardingData.commercialRegister,
        billingAddress: onboardingData.billingAddress
      },
      
      // Kontakte
      contacts: {
        project: onboardingData.projectContact,
        billing: {
          sameAsProject: onboardingData.sameContactForBilling,
          contact: onboardingData.billingContact
        }
      },
      
      // Rechnungsdetails
      billing: {
        invoiceDelivery: onboardingData.invoiceDelivery,
        invoiceEmail: onboardingData.invoiceEmail,
        paymentTerms: onboardingData.paymentTerms,
        costCenter: onboardingData.costCenter,
        specialRequirements: onboardingData.specialRequirements
      },
      
      // Technische Zugangsdaten (dynamisch)
      technicalAccounts: onboardingData.technicalAccounts?.map((account: any) => ({
        id: account.id,
        type: account.type,
        name: account.name,
        provider: account.provider,
        url: account.url,
        username: account.username,
        hasPasswordLink: !!account.passwordLink,
        notes: account.notes,
        twoFactorActive: account.twoFactorActive
      })) || [],
      
      // Bestehende Systeme
      existingSystems: onboardingData.existingSystems,
      
      // Projektspezifische Daten
      projectData: onboardingData.projectData,
      
      // Kommunikation & Termine
      communication: onboardingData.communication,
      
      // Rechtliches
      legal: onboardingData.legal,
      
      // Notfallkontakte
      emergencyContacts: onboardingData.emergencyContacts,
      
      // Metadaten
      meta: {
        source: 'customer_onboarding_form',
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        submittedAt: new Date().toISOString()
      }
    }

    // Webhook senden - das ist die einzige Datenverarbeitung
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CustomerOnboarding/1.0'
      },
      body: JSON.stringify(webhookData),
    })

    if (webhookResponse.ok) {
      console.log('✅ Kundenonboarding-Webhook erfolgreich gesendet')
      
      return NextResponse.json({ 
        success: true, 
        message: 'Onboarding-Daten erfolgreich übermittelt',
        reference: onboardingData.projectReference || `ONB-${Date.now()}`,
        sessionId: sessionId
      })
    } else {
      console.error('❌ Webhook-Fehler:', webhookResponse.status, webhookResponse.statusText)
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Fehler beim Übermitteln der Daten. Bitte versuchen Sie es erneut.' 
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Fehler beim Verarbeiten der Onboarding-Daten:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Fehler beim Verarbeiten der Daten. Bitte versuchen Sie es erneut.' 
      },
      { status: 500 }
    )
  }
}
