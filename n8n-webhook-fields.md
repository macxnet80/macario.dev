# n8n Webhook Felder - Onboarding Daten

## Unternehmensdaten

**Firmenname:**
{{ $json.body.company.name }}

**Rechtsform:**
{{ $json.body.company.legalForm }}

**Umsatzsteuer-ID:**
{{ $json.body.company.vatId }}

**Handelsregisternummer:**
{{ $json.body.company.commercialRegister }}

## Rechnungsadresse

**Straße:**
{{ $json.body.company.billingAddress.street }}

**Postleitzahl und Stadt:**
{{ $json.body.company.billingAddress.postalCode }} {{ $json.body.company.billingAddress.city }}

**Land:**
{{ $json.body.company.billingAddress.country }}

## Ansprechpartner Projekt

**Name:**
{{ $json.body.contacts.project.name }}

**Position:**
{{ $json.body.contacts.project.position }}

**E-Mail:**
{{ $json.body.contacts.project.email }}

**Telefon:**
{{ $json.body.contacts.project.phone }}

**Mobil:**
{{ $json.body.contacts.project.mobile }}

**Bevorzugte Zeiten:**
{{ $json.body.contacts.project.preferredTimes }}

**Bevorzugter Kommunikationsweg:**
{{ $json.body.contacts.project.preferredMethod }}

## Ansprechpartner Rechnung

**Gleicher Kontakt wie Projekt:**
{{ $json.body.contacts.billing.sameAsProject }}

**Name:**
{{ $json.body.contacts.billing.contact.name }}

**Position:**
{{ $json.body.contacts.billing.contact.position }}

**E-Mail:**
{{ $json.body.contacts.billing.contact.email }}

**Telefon:**
{{ $json.body.contacts.billing.contact.phone }}

**Abteilung:**
{{ $json.body.contacts.billing.contact.department }}

## Rechnungsdetails

**E-Mail für Rechnungsversand:**
{{ $json.body.billing.invoiceEmail }}

**Zahlungsbedingungen:**
{{ $json.body.billing.paymentTerms }}

**Kostenstelle/Projektnummer:**
{{ $json.body.billing.costCenter }}

**Besondere Rechnungsanforderungen:**
{{ $json.body.billing.specialRequirements }}

## Rechtliches

**Inhaltsrechte:**
{{ $json.body.legal.contentRights }}

**Datenschutzbeauftragter:**
{{ $json.body.legal.dataProtectionOfficer }}

**Impressum bestätigt:**
{{ $json.body.legal.imprintConfirmed }}

**Datenschutzerklärung bestätigt:**
{{ $json.body.legal.privacyPolicyConfirmed }}

