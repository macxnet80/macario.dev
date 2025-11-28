# System Patterns

## Architektur

### Frontend-Struktur

```
app/
├── page.tsx              # Haupt-Landing Page
├── layout.tsx            # Root Layout
├── admin/                # Admin-Bereich
│   ├── dashboard/
│   ├── login/
│   └── create-onboarding/
├── kundenonboarding/     # Kunden-Onboarding
├── onboarding/[token]/   # Onboarding-Session
├── website-abo/          # Website-Abo Seite
└── termin-bestaetigung/  # Termin-Bestätigung

components/
├── Hero.tsx              # Hero Section mit CTA
├── ProjectWizard.tsx    # Projektanfrage-Wizard
├── ProjectShowcase.tsx   # Portfolio-Projekte
├── CustomerOnboardingWizard.tsx  # Onboarding-Wizard
├── website-abo/          # Website-Abo Komponenten
└── ui/                   # UI-Komponenten (shadcn/ui)
```

### Backend-Struktur (API Routes)

```
app/api/
├── analyze-project/      # OpenAI Projektanalyse
├── submit-project/       # Projektanfrage absenden
├── generate-idea/        # Ideen-Generierung
├── optimize-offer/       # Angebots-Optimierung
├── optimize-briefing/    # Briefing-Optimierung
├── customer-onboarding/  # Onboarding-Daten
├── onboarding-session/  # Onboarding-Session-Verwaltung
├── website-abo-inquiry/  # Website-Abo Anfragen
└── admin/                # Admin-APIs
    ├── login/
    ├── logout/
    ├── me/
    └── onboarding-sessions/
```

## Design Patterns

### 1. Wizard-Pattern

**ProjectWizard** und **CustomerOnboardingWizard** verwenden ein mehrstufiges Wizard-Pattern:
- Schrittweise Datenerfassung
- Validierung pro Schritt
- Fortschrittsanzeige
- State-Management mit React Hooks

### 2. Modal-Pattern

- Wizards öffnen als Modals über der Hauptseite
- `onClose` Callback für Schließen
- Framer Motion für Animationen

### 3. API Route Pattern

- Next.js API Routes für Backend-Logik
- JSON Request/Response
- Error Handling mit try/catch
- Environment Variables für Secrets

### 4. Database Pattern

- Supabase als Backend
- PostgreSQL als Datenbank
- Row Level Security (RLS) für Sicherheit
- Realtime Subscriptions für Live-Updates

### 5. Component Composition

- Kleine, wiederverwendbare Komponenten
- shadcn/ui für UI-Basis-Komponenten
- Tailwind CSS für Styling
- TypeScript für Type Safety

## Wichtige Komponenten-Beziehungen

```
Hero
  └── ProjectWizard (Modal)
  └── (VoiceAgent entfernt)

ProjectWizard
  └── API: /api/analyze-project
  └── API: /api/submit-project

CustomerOnboardingWizard
  └── API: /api/customer-onboarding
  └── API: /api/onboarding-session/[token]

ProjectShowcase
  └── Supabase: projects table
  └── Hook: useProjects (Realtime)
```

## State Management

- **React Hooks**: useState, useEffect, useRef
- **Supabase Realtime**: Für Live-Updates von Projekten
- **Local State**: Für Wizard-Schritte und Formulare
- **URL State**: Für Onboarding-Tokens

## Error Handling

- Try/Catch in API Routes
- Error States in Komponenten
- User-freundliche Fehlermeldungen
- Logging für Debugging

