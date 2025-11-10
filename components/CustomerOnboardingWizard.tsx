'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  User,
  Building,
  Calendar,
  Shield,
  Database,
  Settings,
  FileText,
  Users,
  Clock,
  Lock,
  ExternalLink,
  AlertTriangle,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface OnboardingData {
  // Projektidentifikation (wird vom Admin vorgegeben)
  projectReference: string
  projectScope: string
  contractType: string
  plannedStart: string
  agreedDeadline: string
  
  // Schritt 1: Unternehmensdaten
  companyName: string
  legalForm: string
  vatId: string
  commercialRegister: string
  billingAddress: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  
  // Schritt 2: Ansprechpartner Projekt
  projectContact: {
    name: string
    position: string
    email: string
    phone: string
    mobile: string
    preferredTimes: string
    preferredMethod: string
  }
  
  // Schritt 3: Ansprechpartner Rechnung
  sameContactForBilling: boolean
  billingContact: {
    name: string
    position: string
    email: string
    phone: string
    department: string
  }
  
  // Schritt 4: Rechnungsdetails
  invoiceDelivery: string
  invoiceEmail: string
  paymentTerms: string
  costCenter: string
  specialRequirements: string
  
  // Schritt 5: Technische Zugangsdaten (Dynamisch)
  technicalAccounts: Array<{
    id: string
    type: string
    name: string
    provider: string
    url: string
    username: string
    passwordLink: string
    notes: string
    twoFactorActive: boolean
  }>
  
  // Schritt 6: Bestehende Systeme
  existingSystems: {
    crm: string
    emailMarketing: string
    analytics: string
    socialMedia: string
    otherTools: string
    apiAccess: string
  }
  
  // Schritt 7: Projektspezifische Daten
  projectData: {
    textsAvailable: boolean
    imagesAvailable: boolean
    logoFiles: string
    brandColors: string
    fonts: string
    designGuidelines: string
    targetAudience: string
    competitorWebsites: string
  }
  
  // Schritt 8: Kommunikation & Termine
  communication: {
    preferredMeetingTimes: string
    feedbackAvailability: string
    updateFrequency: string
    kickoffDate: string
    reviewDates: string
    goLiveDate: string
  }
  
  // Schritt 10: Rechtliches & Freigaben
  legal: {
    contentRights: boolean
    dataProtectionOfficer: string
    imprintConfirmed: boolean
    privacyPolicyConfirmed: boolean
    contractSigned: boolean
  }
  
  // Schritt 11: Notfallkontakte
  emergencyContacts: {
    primaryContact: string
    backupContact: string
    escalationContact: string
  }
}

interface StepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  nextStep: () => void
  prevStep: () => void
  isFirst: boolean
  isLast: boolean
  addressStyle?: 'du' | 'sie'
}

// Schritt 1: Unternehmensdaten - Typeform Style
function CompanyDataStep({ data, updateData, nextStep, prevStep, isFirst, addressStyle = 'sie' }: StepProps) {
  const legalForms = [
    'GmbH',
    'UG (haftungsbeschränkt)',
    'AG',
    'Einzelunternehmen',
    'GbR',
    'OHG',
    'KG',
    'e.V.',
    'Freiberufler',
    'Sonstiges'
  ]

  return (
    <div className="space-y-8">
      {/* Typeform Style: Große, zentrierte Überschrift */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Unternehmensdaten
        </h2>
        <p className="text-xl md:text-2xl text-gray-300">
          {addressStyle === 'du' ? 'Deine Rechnungsdaten für die Projektabwicklung' : 'Ihre Rechnungsdaten für die Projektabwicklung'}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-300 mb-4">
            Firmenname *
          </label>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => updateData({ companyName: e.target.value })}
            className="w-full px-6 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            placeholder={addressStyle === 'du' ? 'Deine Firma GmbH' : 'Ihre Firma GmbH'}
            autoFocus
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-300 mb-4">
            Rechtsform *
          </label>
          <Select value={data.legalForm} onValueChange={(value) => updateData({ legalForm: value })}>
            <SelectTrigger className="w-full bg-gray-800/50 border-2 border-gray-700 text-white text-lg h-[3.5rem] px-6 py-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary">
              <SelectValue placeholder="Rechtsform auswählen" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {legalForms.map((form) => (
                <SelectItem key={form} value={form} className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">{form}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-300 mb-4">
            Umsatzsteuer-ID
          </label>
          <input
            type="text"
            value={data.vatId}
            onChange={(e) => updateData({ vatId: e.target.value })}
            className="w-full px-6 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            placeholder="DE123456789"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-300 mb-4">
            Handelsregisternummer
          </label>
          <input
            type="text"
            value={data.commercialRegister}
            onChange={(e) => updateData({ commercialRegister: e.target.value })}
            className="w-full px-6 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            placeholder="HRB 12345"
          />
        </div>
      </div>

      {/* Typeform Style: Buttons */}
      <div className="flex justify-center gap-4 mt-12">
        {!isFirst && (
          <button
            onClick={prevStep}
            className="text-gray-500 hover:text-gray-400 transition-colors text-lg flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Zurück
          </button>
        )}
        <Button 
          onClick={nextStep}
          disabled={!data.companyName || !data.legalForm}
          className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Weiter <ArrowRight className="ml-3 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

// Schritt 2: Rechnungsadresse - Typeform Style
function BillingAddressStep({ data, updateData, nextStep, prevStep, isFirst, addressStyle = 'sie' }: StepProps) {
  return (
    <div className="space-y-8">
      {/* Typeform Style: Große, zentrierte Überschrift */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Rechnungsadresse
        </h2>
        <p className="text-xl md:text-2xl text-gray-300">
          {addressStyle === 'du' ? 'Deine Rechnungsadresse für die Projektabwicklung' : 'Ihre Rechnungsadresse für die Projektabwicklung'}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-300 mb-4">
            Straße & Hausnummer *
          </label>
          <input
            type="text"
            value={data.billingAddress.street}
            onChange={(e) => updateData({ 
              billingAddress: { ...data.billingAddress, street: e.target.value }
            })}
            className="w-full px-6 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            placeholder="Musterstraße 123"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-4">
              PLZ *
            </label>
            <input
              type="text"
              value={data.billingAddress.postalCode}
              onChange={(e) => updateData({ 
                billingAddress: { ...data.billingAddress, postalCode: e.target.value }
              })}
              className="w-full px-6 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="12345"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-300 mb-4">
              Ort *
            </label>
            <input
              type="text"
              value={data.billingAddress.city}
              onChange={(e) => updateData({ 
                billingAddress: { ...data.billingAddress, city: e.target.value }
              })}
              className="w-full px-6 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Musterstadt"
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-300 mb-4">
            Land *
          </label>
          <Select 
            value={data.billingAddress.country} 
            onValueChange={(value) => updateData({ 
              billingAddress: { ...data.billingAddress, country: value }
            })}
          >
            <SelectTrigger className="w-full bg-gray-800/50 border-2 border-gray-700 text-white text-lg h-[3.5rem] px-6 py-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary">
              <SelectValue placeholder="Land auswählen" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="Deutschland" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">Deutschland</SelectItem>
              <SelectItem value="Österreich" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">Österreich</SelectItem>
              <SelectItem value="Schweiz" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">Schweiz</SelectItem>
              <SelectItem value="Niederlande" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">Niederlande</SelectItem>
              <SelectItem value="Belgien" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">Belgien</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Typeform Style: Buttons */}
      <div className="flex justify-center gap-4 mt-12">
        {!isFirst && (
          <button
            onClick={prevStep}
            className="text-gray-500 hover:text-gray-400 transition-colors text-lg flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Zurück
          </button>
        )}
        <Button 
          onClick={nextStep}
          disabled={!data.billingAddress.street || !data.billingAddress.city || !data.billingAddress.postalCode || !data.billingAddress.country}
          className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Weiter <ArrowRight className="ml-3 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

// Schritt 3: Ansprechpartner Projekt
function ProjectContactStep({ data, updateData, nextStep, prevStep, addressStyle = 'sie' }: StepProps) {
  const communicationMethods = [
    'E-Mail',
    'Telefon',
    'Video-Call (Teams/Zoom)',
    'WhatsApp Business',
    'Slack/Discord'
  ]

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <User className="h-6 w-6 mr-2" />
          Ansprechpartner Projekt
        </h2>
        <p className="text-gray-400 text-sm">Ihr direkter Kontakt für alle projektbezogenen Fragen</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            value={data.projectContact.name}
            onChange={(e) => updateData({ 
              projectContact: { ...data.projectContact, name: e.target.value }
            })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Max Mustermann"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Position/Funktion
          </label>
          <input
            type="text"
            value={data.projectContact.position}
            onChange={(e) => updateData({ 
              projectContact: { ...data.projectContact, position: e.target.value }
            })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Geschäftsführer, Marketing-Leiter, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            E-Mail *
          </label>
          <input
            type="email"
            value={data.projectContact.email}
            onChange={(e) => updateData({ 
              projectContact: { ...data.projectContact, email: e.target.value }
            })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="max@beispiel.de"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Telefon *
          </label>
          <input
            type="tel"
            value={data.projectContact.phone}
            onChange={(e) => updateData({ 
              projectContact: { ...data.projectContact, phone: e.target.value }
            })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="+49 123 456789"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mobil
          </label>
          <input
            type="tel"
            value={data.projectContact.mobile}
            onChange={(e) => updateData({ 
              projectContact: { ...data.projectContact, mobile: e.target.value }
            })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="+49 170 123456"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bevorzugter Kommunikationsweg
          </label>
          <Select 
            value={data.projectContact.preferredMethod} 
            onValueChange={(value) => updateData({ 
              projectContact: { ...data.projectContact, preferredMethod: value }
            })}
          >
            <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white h-[3.5rem] px-4 py-3">
              <SelectValue placeholder="Kommunikationsweg auswählen" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {communicationMethods.map((method) => (
                <SelectItem key={method} value={method} className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">{method}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bevorzugte Kommunikationszeiten
          </label>
          <textarea
            value={data.projectContact.preferredTimes}
            onChange={(e) => updateData({ 
              projectContact: { ...data.projectContact, preferredTimes: e.target.value }
            })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
            placeholder="z.B. Mo-Fr 9-17 Uhr, Mittwochs nur bis 14 Uhr"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="text-gray-500 hover:text-gray-400 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Zurück
        </button>
        <Button 
          onClick={nextStep}
          disabled={!data.projectContact.name || !data.projectContact.email || !data.projectContact.phone}
          className="bg-primary hover:bg-primary/90"
        >
          Weiter <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Schritt 3: Ansprechpartner Rechnung
function BillingContactStep({ data, updateData, nextStep, prevStep, addressStyle = 'sie' }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <Mail className="h-6 w-6 mr-2" />
          Ansprechpartner Rechnung
        </h2>
        <p className="text-gray-400 text-sm">Kontakt für Rechnungen und Zahlungsangelegenheiten</p>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <input
          type="checkbox"
          id="sameContact"
          checked={data.sameContactForBilling}
          onChange={(e) => updateData({ sameContactForBilling: e.target.checked })}
          className="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
        />
        <label htmlFor="sameContact" className="text-sm text-gray-300">
          Gleicher Ansprechpartner wie für das Projekt
        </label>
      </div>

      {!data.sameContactForBilling && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={data.billingContact.name}
              onChange={(e) => updateData({ 
                billingContact: { ...data.billingContact, name: e.target.value }
              })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Anna Müller"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Position/Funktion
            </label>
            <input
              type="text"
              value={data.billingContact.position}
              onChange={(e) => updateData({ 
                billingContact: { ...data.billingContact, position: e.target.value }
              })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Buchhaltung, Einkauf, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              E-Mail *
            </label>
            <input
              type="email"
              value={data.billingContact.email}
              onChange={(e) => updateData({ 
                billingContact: { ...data.billingContact, email: e.target.value }
              })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="buchhaltung@beispiel.de"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Telefon
            </label>
            <input
              type="tel"
              value={data.billingContact.phone}
              onChange={(e) => updateData({ 
                billingContact: { ...data.billingContact, phone: e.target.value }
              })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="+49 123 456789"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Abteilung
            </label>
            <input
              type="text"
              value={data.billingContact.department}
              onChange={(e) => updateData({ 
                billingContact: { ...data.billingContact, department: e.target.value }
              })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Buchhaltung, Finanzen, Einkauf"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="text-gray-500 hover:text-gray-400 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Zurück
        </button>
        <Button 
          onClick={nextStep}
          disabled={!data.sameContactForBilling && (!data.billingContact.name || !data.billingContact.email)}
          className="bg-primary hover:bg-primary/90"
        >
          Weiter <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Schritt 4: Rechnungsdetails
function BillingDetailsStep({ data, updateData, nextStep, prevStep, addressStyle = 'sie' }: StepProps) {
  const deliveryMethods = [
    'Per E-Mail (PDF)',
    'Per Post',
    'Beides'
  ]

  const paymentTerms = [
    '7 Tage',
    '14 Tage',
    '30 Tage',
    'Sofort bei Erhalt',
    'Nach Vereinbarung'
  ]

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <FileText className="h-6 w-6 mr-2" />
          Rechnungsdetails
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            E-Mail für Rechnungsversand *
          </label>
          <input
            type="email"
            value={data.invoiceEmail}
            onChange={(e) => updateData({ invoiceEmail: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="rechnung@beispiel.de"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Kostenstelle/Projektnummer
          </label>
          <input
            type="text"
            value={data.costCenter}
            onChange={(e) => updateData({ costCenter: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="KST-2024-001"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Besondere Rechnungsanforderungen
          </label>
          <textarea
            value={data.specialRequirements}
            onChange={(e) => updateData({ specialRequirements: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
            placeholder="z.B. Bestellnummer auf Rechnung, spezielle Adressierung, etc."
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="text-gray-500 hover:text-gray-400 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Zurück
        </button>
        <Button 
          onClick={nextStep}
          disabled={!data.invoiceEmail}
          className="bg-primary hover:bg-primary/90"
        >
          Weiter <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Schritt 5: Technische Zugangsdaten (Dynamisch)
function TechnicalAccessStep({ data, updateData, nextStep, prevStep, addressStyle = 'sie' }: StepProps) {
  const accountTypes = [
    { value: 'domain', label: 'Domain-Verwaltung', icon: '🌐' },
    { value: 'hosting', label: 'Hosting/Server', icon: '🖥️' },
    { value: 'email', label: 'E-Mail-Verwaltung', icon: '📧' },
    { value: 'website', label: 'Website/CMS', icon: '🌍' },
    { value: 'ftp', label: 'FTP/SFTP', icon: '📁' },
    { value: 'database', label: 'Datenbank', icon: '🗄️' },
    { value: 'cdn', label: 'CDN/Cache', icon: '⚡' },
    { value: 'analytics', label: 'Analytics', icon: '📊' },
    { value: 'social', label: 'Social Media', icon: '📱' },
    { value: 'payment', label: 'Payment/Shop', icon: '💳' },
    { value: 'backup', label: 'Backup-Service', icon: '💾' },
    { value: 'monitoring', label: 'Monitoring', icon: '📈' },
    { value: 'projectmanagement', label: 'Projektmanagement', icon: '📋' },
    { value: 'other', label: 'Sonstiges', icon: '🔧' }
  ]

  const addAccount = () => {
    const newAccount = {
      id: `account_${Date.now()}`,
      type: '',
      name: '',
      provider: '',
      url: '',
      username: '',
      passwordLink: '',
      notes: '',
      twoFactorActive: false
    }
    
    updateData({
      technicalAccounts: [...data.technicalAccounts, newAccount]
    })
  }

  const removeAccount = (id: string) => {
    updateData({
      technicalAccounts: data.technicalAccounts.filter(account => account.id !== id)
    })
  }

  const updateAccount = (id: string, updates: Partial<typeof data.technicalAccounts[0]>) => {
    updateData({
      technicalAccounts: data.technicalAccounts.map(account => 
        account.id === id ? { ...account, ...updates } : account
      )
    })
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <Settings className="h-6 w-6 mr-2" />
          Technische Zugangsdaten
        </h2>
        <p className="text-gray-400 text-sm">
          {addressStyle === 'du' 
            ? 'Teile nur die Accounts, die du für das Projekt benötigst' 
            : 'Teilen Sie nur die Accounts, die Sie für das Projekt benötigen'}
        </p>
      </div>

      {/* Sicherheitshinweis und Anleitung - 2 Spalten Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datenschutz & Sicherheit */}
        <Card className="bg-blue-900/20 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">🔒 Datenschutz & Sicherheit</h3>
                <p className="text-blue-200 mb-3">
                  Für die sichere Übertragung von Passwörtern {addressStyle === 'du' ? 'nutze bitte' : 'nutzen Sie bitte'}{' '}
                  <a 
                    href="https://one-time-secret.de/de" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline inline-flex items-center"
                  >
                    One-Time Secret <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                  . {addressStyle === 'du' ? 'Erstelle dort einen einmaligen Link für jedes Passwort.' : 'Erstellen Sie dort einen einmaligen Link für jedes Passwort.'}
                </p>
                <p className="text-blue-200 text-sm">
                  Nach der Übertragung speichere ich alle Zugangsdaten sicher in meinem Passwort-Manager (Proton Pass) 
                  und teile sie verschlüsselt mit {addressStyle === 'du' ? 'dir' : 'Ihnen'} für die weitere Zusammenarbeit.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Anleitung für One-Time Secret */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-left">
              <Lock className="h-5 w-5 mr-2" />
              Anleitung für One-Time Secret
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="text-gray-300 space-y-2 text-sm text-left">
              <li>1. {addressStyle === 'du' ? 'Besuche' : 'Besuchen Sie'} <a href="https://one-time-secret.de/de" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://one-time-secret.de/de</a></li>
              <li>2. {addressStyle === 'du' ? 'Gib' : 'Geben Sie'} das Passwort in das Textfeld ein</li>
              <li>3. {addressStyle === 'du' ? 'Klicke' : 'Klicken Sie'} auf "Geheimnis erstellen"</li>
              <li>4. {addressStyle === 'du' ? 'Kopiere' : 'Kopieren Sie'} den generierten Link</li>
              <li>5. {addressStyle === 'du' ? 'Füge' : 'Fügen Sie'} den Link in das entsprechende Feld hier ein</li>
              <li className="text-yellow-400">⚠️ Wichtig: Der Link funktioniert nur einmal und läuft nach 7 Tagen ab</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Dynamische Account-Liste */}
      <div className="space-y-4">
        {data.technicalAccounts.map((account, index) => (
          <Card key={account.id} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center text-left">
                  <span className="mr-2">
                    {accountTypes.find(t => t.value === account.type)?.icon || '🔧'}
                  </span>
                  Account #{index + 1}
                  {account.name && ` - ${account.name}`}
                </CardTitle>
                <Button
                  onClick={() => removeAccount(account.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-400 border-red-400 hover:bg-red-400/10"
                >
                  Entfernen
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Account-Typ *
                  </label>
                  <Select 
                    value={account.type} 
                    onValueChange={(value) => updateAccount(account.id, { type: value })}
                  >
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white py-3">
                      <SelectValue placeholder="Typ auswählen" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {accountTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">
                          <span className="flex items-center">
                            <span className="mr-2">{type.icon}</span>
                            {type.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Account-Name
                  </label>
                  <input
                    type="text"
                    value={account.name}
                    onChange={(e) => updateAccount(account.id, { name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="z.B. Hauptdomain, Admin-Account"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Anbieter/Service
                  </label>
                  <input
                    type="text"
                    value={account.provider}
                    onChange={(e) => updateAccount(account.id, { provider: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="z.B. 1&1 IONOS, WordPress, Gmail"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Login-URL
                  </label>
                  <input
                    type="url"
                    value={account.url}
                    onChange={(e) => updateAccount(account.id, { url: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://login.beispiel.de"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Benutzername/E-Mail *
                  </label>
                  <input
                    type="text"
                    value={account.username}
                    onChange={(e) => updateAccount(account.id, { username: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Benutzername oder E-Mail"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Passwort (One-Time Secret Link) *
                  </label>
                  <input
                    type="url"
                    value={account.passwordLink}
                    onChange={(e) => updateAccount(account.id, { passwordLink: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://one-time-secret.de/secret/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Zusätzliche Notizen
                </label>
                <textarea
                  value={account.notes}
                  onChange={(e) => updateAccount(account.id, { notes: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={2}
                  placeholder="z.B. Server-Details, besondere Hinweise, FTP-Port, etc."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`twoFactor_${account.id}`}
                  checked={account.twoFactorActive}
                  onChange={(e) => updateAccount(account.id, { twoFactorActive: e.target.checked })}
                  className="rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary"
                />
                <label htmlFor={`twoFactor_${account.id}`} className="text-sm text-gray-300">
                  Zwei-Faktor-Authentifizierung aktiv
                </label>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Account hinzufügen Button */}
        <Card className="bg-gray-800/30 border-gray-600 border-dashed">
          <CardContent className="p-6">
            <Button
              onClick={addAccount}
              variant="outline"
              className="w-full border-dashed border-gray-500 text-gray-400 hover:text-white hover:border-primary"
            >
              <Database className="mr-2 h-4 w-4" />
              Weiteren Account hinzufügen
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Nach der Übertragung Info */}
      <Card className="bg-green-900/20 border-green-500/30">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-green-300 mb-3 text-left">Nach der Übertragung</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-200">
            <div className="flex items-center space-x-2 text-left">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span>Alle Zugangsdaten werden sicher in Proton Pass gespeichert</span>
            </div>
            <div className="flex items-center space-x-2 text-left">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span>Verschlüsselter Zugang wird dir/Ihnen mitgeteilt</span>
            </div>
            <div className="flex items-center space-x-2 text-left">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span>Regelmäßige Sicherheits-Updates und Backups</span>
            </div>
            <div className="flex items-center space-x-2 text-left">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span>Sichere Teamzusammenarbeit möglich</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="text-gray-500 hover:text-gray-400 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Zurück
        </button>
        <Button 
          onClick={nextStep} 
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Weiter <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Schritt 6: Zusammenfassung & Bestätigung
function SummaryStep({ data, updateData, nextStep, prevStep, addressStyle = 'sie' }: StepProps) {
  const accountTypes = [
    { value: 'domain', label: 'Domain-Verwaltung', icon: '🌐' },
    { value: 'hosting', label: 'Hosting/Server', icon: '🖥️' },
    { value: 'email', label: 'E-Mail-Verwaltung', icon: '📧' },
    { value: 'website', label: 'Website/CMS', icon: '🌍' },
    { value: 'ftp', label: 'FTP/SFTP', icon: '📁' },
    { value: 'database', label: 'Datenbank', icon: '🗄️' },
    { value: 'cdn', label: 'CDN/Cache', icon: '⚡' },
    { value: 'analytics', label: 'Analytics', icon: '📊' },
    { value: 'social', label: 'Social Media', icon: '📱' },
    { value: 'payment', label: 'Payment/Shop', icon: '💳' },
    { value: 'backup', label: 'Backup-Service', icon: '💾' },
    { value: 'monitoring', label: 'Monitoring', icon: '📈' },
    { value: 'projectmanagement', label: 'Projektmanagement', icon: '📋' },
    { value: 'other', label: 'Sonstiges', icon: '🔧' }
  ]

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <FileText className="h-6 w-6 mr-2" />
          Zusammenfassung & Bestätigung
        </h2>
        <p className="text-gray-400 text-sm">
          {addressStyle === 'du' 
            ? 'Bitte überprüfe deine Angaben vor dem Absenden' 
            : 'Bitte überprüfen Sie Ihre Angaben vor dem Absenden'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projektdaten */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-left">
              <FileText className="h-5 w-5 mr-2" />
              Projektdaten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-gray-400">Referenz:</span>
              <span className="text-white">{data.projectReference || 'Nicht angegeben'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Umfang:</span>
              <span className="text-white">{data.projectScope}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Vertragsart:</span>
              <span className="text-white">{data.contractType}</span>
            </div>
            {data.plannedStart && (
              <div className="flex justify-between">
                <span className="text-gray-400">Projektstart:</span>
                <span className="text-white">{data.plannedStart}</span>
              </div>
            )}
            {data.agreedDeadline && (
              <div className="flex justify-between">
                <span className="text-gray-400">Deadline:</span>
                <span className="text-white">{data.agreedDeadline}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Unternehmensdaten */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-left">
              <Building className="h-5 w-5 mr-2" />
              Unternehmen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-gray-400">Firma:</span>
              <span className="text-white">{data.companyName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rechtsform:</span>
              <span className="text-white">{data.legalForm}</span>
            </div>
            {data.vatId && (
              <div className="flex justify-between">
                <span className="text-gray-400">Umsatzsteuer-ID:</span>
                <span className="text-white">{data.vatId}</span>
              </div>
            )}
            {data.commercialRegister && (
              <div className="flex justify-between">
                <span className="text-gray-400">Handelsregisternummer:</span>
                <span className="text-white">{data.commercialRegister}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Adresse:</span>
              <span className="text-white text-right">
                {data.billingAddress.street}<br />
                {data.billingAddress.postalCode} {data.billingAddress.city}<br />
                {data.billingAddress.country}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Ansprechpartner */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-left">
              <Users className="h-5 w-5 mr-2" />
              Ansprechpartner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <span className="text-white">{data.projectContact.name}</span>
            </div>
            {data.projectContact.position && (
              <div className="flex justify-between">
                <span className="text-gray-400">Position:</span>
                <span className="text-white">{data.projectContact.position}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">E-Mail:</span>
              <span className="text-white">{data.projectContact.email}</span>
            </div>
            {data.projectContact.phone && (
              <div className="flex justify-between">
                <span className="text-gray-400">Telefon:</span>
                <span className="text-white">{data.projectContact.phone}</span>
              </div>
            )}
            {data.projectContact.mobile && (
              <div className="flex justify-between">
                <span className="text-gray-400">Mobil:</span>
                <span className="text-white">{data.projectContact.mobile}</span>
              </div>
            )}
            {data.projectContact.preferredTimes && (
              <div className="flex justify-between">
                <span className="text-gray-400">Bevorzugte Zeiten:</span>
                <span className="text-white">{data.projectContact.preferredTimes}</span>
              </div>
            )}
            {data.projectContact.preferredMethod && (
              <div className="flex justify-between">
                <span className="text-gray-400">Kommunikationsweg:</span>
                <span className="text-white">{data.projectContact.preferredMethod}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rechnungsdetails */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-left">
              <Mail className="h-5 w-5 mr-2" />
              Rechnungsdetails
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-gray-400">E-Mail:</span>
              <span className="text-white">{data.invoiceEmail}</span>
            </div>
            {data.costCenter && (
              <div className="flex justify-between">
                <span className="text-gray-400">Kostenstelle/Projektnummer:</span>
                <span className="text-white">{data.costCenter}</span>
              </div>
            )}
            {data.specialRequirements && (
              <div className="flex flex-col">
                <span className="text-gray-400 mb-1">Besondere Anforderungen:</span>
                <span className="text-white whitespace-pre-line">{data.specialRequirements}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ansprechpartner Rechnung */}
        {!data.sameContactForBilling && (
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-left">
                <Mail className="h-5 w-5 mr-2" />
                Ansprechpartner Rechnung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-left">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white">{data.billingContact.name}</span>
              </div>
              {data.billingContact.position && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Position:</span>
                  <span className="text-white">{data.billingContact.position}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">E-Mail:</span>
                <span className="text-white">{data.billingContact.email}</span>
              </div>
              {data.billingContact.phone && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Telefon:</span>
                  <span className="text-white">{data.billingContact.phone}</span>
                </div>
              )}
              {data.billingContact.department && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Abteilung:</span>
                  <span className="text-white">{data.billingContact.department}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Technische Daten Übersicht */}
      {data.technicalAccounts.length > 0 && (
        <Card className="bg-blue-900/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Technische Zugangsdaten ({data.technicalAccounts.length} Accounts)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-blue-200">
            {data.technicalAccounts.map((account, index) => (
              <div key={account.id} className="border-b border-blue-500/20 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span>
                    {accountTypes.find(t => t.value === account.type)?.icon || '🔧'}
                  </span>
                  <span className="font-semibold">
                    {account.name || `${accountTypes.find(t => t.value === account.type)?.label || 'Account'} ${index + 1}`}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-blue-300 ml-6">
                  {account.type && (
                    <div className="flex justify-between">
                      <span>Typ:</span>
                      <span>{accountTypes.find(t => t.value === account.type)?.label || account.type}</span>
                    </div>
                  )}
                  {account.provider && (
                    <div className="flex justify-between">
                      <span>Provider:</span>
                      <span>{account.provider}</span>
                    </div>
                  )}
                  {account.url && (
                    <div className="flex justify-between">
                      <span>URL:</span>
                      <span className="break-all">{account.url}</span>
                    </div>
                  )}
                  {account.username && (
                    <div className="flex justify-between">
                      <span>Benutzername:</span>
                      <span>{account.username}</span>
                    </div>
                  )}
                  {account.passwordLink && (
                    <div className="flex justify-between">
                      <span>Passwort-Link:</span>
                      <span className="break-all text-blue-400">✓ Übertragen</span>
                    </div>
                  )}
                  {account.notes && (
                    <div className="flex flex-col">
                      <span>Notizen:</span>
                      <span className="text-blue-200">{account.notes}</span>
                    </div>
                  )}
                  {account.twoFactorActive && (
                    <div className="flex justify-between">
                      <span>2FA:</span>
                      <span>✓ Aktiv</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="text-xs text-blue-300 mt-4 pt-3 border-t border-blue-500/20">
              🔒 Alle Passwörter werden sicher über One-Time Secret übertragen
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bestätigungen */}
      <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Bestätigungen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="dataAccuracy"
              checked={data.legal?.contentRights || false}
              onChange={(e) => updateData({ 
                legal: { ...data.legal, contentRights: e.target.checked }
              })}
              className="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
            />
            <label htmlFor="dataAccuracy" className="text-sm text-gray-300">
              Ich bestätige, dass alle Angaben korrekt und vollständig sind *
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="dataProcessing"
              checked={data.legal?.privacyPolicyConfirmed || false}
              onChange={(e) => updateData({ 
                legal: { ...data.legal, privacyPolicyConfirmed: e.target.checked }
              })}
              className="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
            />
            <label htmlFor="dataProcessing" className="text-sm text-gray-300">
              Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzerklärung zu *
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="projectStart"
              checked={data.legal?.contractSigned || false}
              onChange={(e) => updateData({ 
                legal: { ...data.legal, contractSigned: e.target.checked }
              })}
              className="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
            />
            <label htmlFor="projectStart" className="text-sm text-gray-300">
              Ich gebe das Projekt zur Bearbeitung frei *
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="text-gray-500 hover:text-gray-400 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Zurück
        </button>
        <Button 
          onClick={nextStep}
          disabled={!data.legal?.contentRights || !data.legal?.privacyPolicyConfirmed || !data.legal?.contractSigned}
          className="bg-primary hover:bg-primary/90"
        >
          Onboarding abschließen <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Erfolgsseite
function SuccessStep({ addressStyle = 'sie' }: { addressStyle?: 'du' | 'sie' }) {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-24 h-24 bg-green-500 rounded-full flex items-center justify-center"
      >
        <CheckCircle className="h-12 w-12 text-white" />
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 mr-2 text-green-400" />
          Vielen Dank!
        </h2>
        <p className="text-lg text-gray-300 mb-6 text-center">
          {addressStyle === 'du' 
            ? 'Deine Onboarding-Daten wurden erfolgreich übermittelt.' 
            : 'Ihre Onboarding-Daten wurden erfolgreich übermittelt.'}
        </p>
        <p className="text-gray-400 mb-8">
          {addressStyle === 'du' 
            ? 'Ich werde mich in Kürze bei dir melden, um die nächsten Schritte zu besprechen.' 
            : 'Ich werde mich in Kürze bei Ihnen melden, um die nächsten Schritte zu besprechen.'}
        </p>
      </div>

      <Button 
        onClick={() => window.location.href = '/'}
        className="bg-primary hover:bg-primary/90"
      >
        Zur Startseite
      </Button>
    </div>
  )
}

interface CustomerOnboardingWizardProps {
  initialData?: {
    projectReference?: string
    projectScope?: string
    contractType?: string
    plannedStart?: string
    agreedDeadline?: string
    paymentTerms?: string
  }
  sessionToken?: string
  addressStyle?: 'du' | 'sie'
}

export default function CustomerOnboardingWizard({ 
  initialData = {},
  sessionToken,
  addressStyle = 'sie'
}: CustomerOnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    // Initialisierung aller Felder mit initialData
    projectReference: initialData.projectReference || '',
    projectScope: initialData.projectScope || '',
    contractType: initialData.contractType || '',
    plannedStart: initialData.plannedStart || '',
    agreedDeadline: initialData.agreedDeadline || '',
    companyName: '',
    legalForm: '',
    vatId: '',
    commercialRegister: '',
    billingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Deutschland'
    },
    projectContact: {
      name: '',
      position: '',
      email: '',
      phone: '',
      mobile: '',
      preferredTimes: '',
      preferredMethod: ''
    },
    sameContactForBilling: true,
    billingContact: {
      name: '',
      position: '',
      email: '',
      phone: '',
      department: ''
    },
    invoiceDelivery: '',
    invoiceEmail: '',
    paymentTerms: initialData.paymentTerms || '',
    costCenter: '',
    specialRequirements: '',
    technicalAccounts: [],
    existingSystems: {
      crm: '',
      emailMarketing: '',
      analytics: '',
      socialMedia: '',
      otherTools: '',
      apiAccess: ''
    },
    projectData: {
      textsAvailable: false,
      imagesAvailable: false,
      logoFiles: '',
      brandColors: '',
      fonts: '',
      designGuidelines: '',
      targetAudience: '',
      competitorWebsites: ''
    },
    communication: {
      preferredMeetingTimes: '',
      feedbackAvailability: '',
      updateFrequency: '',
      kickoffDate: '',
      reviewDates: '',
      goLiveDate: ''
    },
    legal: {
      contentRights: false,
      dataProtectionOfficer: '',
      imprintConfirmed: false,
      privacyPolicyConfirmed: false,
      contractSigned: false
    },
    emergencyContacts: {
      primaryContact: '',
      backupContact: '',
      escalationContact: ''
    }
  })

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = async () => {
    if (currentStep === steps.length - 2) {
      // Letzter Schritt vor Erfolgsseite - Daten senden
      setIsSubmitting(true)
      try {
        // Sende Daten an Webhook
        const webhookResponse = await fetch('/api/customer-onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            sessionToken: sessionToken
          }),
        })

        if (!webhookResponse.ok) {
          alert('Fehler beim Senden der Daten. Bitte versuchen Sie es erneut.')
          setIsSubmitting(false)
          return
        }

        // Aktualisiere Session wenn sessionToken vorhanden ist
        if (sessionToken) {
          try {
            await fetch(`/api/onboarding-session/${sessionToken}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                customerData: data
              }),
            })
          } catch (sessionError) {
            console.error('Error updating session:', sessionError)
            // Session-Update ist nicht kritisch, Webhook wurde bereits gesendet
          }
        }

        setCurrentStep(prev => prev + 1)
      } catch (error) {
        console.error('Error submitting data:', error)
        alert('Fehler beim Senden der Daten. Bitte versuchen Sie es erneut.')
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => setCurrentStep(prev => prev - 1)

  const steps = [
    CompanyDataStep,
    BillingAddressStep,
    ProjectContactStep,
    BillingContactStep,
    BillingDetailsStep,
    TechnicalAccessStep,
    SummaryStep,
    SuccessStep
  ]

  const CurrentStepComponent = steps[currentStep]
  const totalSteps = steps.length - 1 // Erfolgsseite nicht mitzählen

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Fortschrittsanzeige - Typeform Style */}
        {currentStep < totalSteps && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-400 font-medium">
                {currentStep + 1} / {totalSteps}
              </span>
              <span className="text-sm text-gray-400">
                {Math.round(((currentStep + 1) / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-800/30 rounded-full h-1 overflow-hidden">
              <motion.div 
                className="bg-primary h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Aktueller Schritt - Typeform Style */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-center"
          >
            {currentStep === steps.length - 1 ? (
              <SuccessStep addressStyle={addressStyle} />
            ) : (
              <CurrentStepComponent
                data={data}
                updateData={updateData}
                nextStep={nextStep}
                prevStep={prevStep}
                isFirst={currentStep === 0}
                isLast={currentStep === steps.length - 1}
                addressStyle={addressStyle}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
