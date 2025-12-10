# System Patterns

## Architektur

### Frontend-Struktur

```
app/
├── page.tsx              # Haupt-Landing Page
├── layout.tsx            # Root Layout
├── wizard/               # Wizard Landingpage (SEO-hidden)
│   ├── page.tsx
│   └── layout.tsx
├── admin/                # Admin-Bereich
│   ├── dashboard/
│   ├── login/
│   └── create-onboarding/
├── kundenonboarding/     # Kunden-Onboarding
├── onboarding/[token]/   # Onboarding-Session
└── termin-bestaetigung/  # Termin-Bestätigung

components/
├── Hero.tsx              # Hero Section mit CTA
├── ProjectWizard.tsx     # Projektanfrage-Wizard (Modal)
├── WizardLanding.tsx     # Wizard Landingpage (Standalone)
├── ProjectShowcase.tsx   # Portfolio-Projekte
├── CustomerOnboardingWizard.tsx  # Onboarding-Wizard
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

- Wizards öffnen als Modals über der Hauptseite (`ProjectWizard`)
- Standalone-Landingpage für Marketing-Kampagnen (`WizardLanding`)
- `onClose` Callback für Modals
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

### 6. Design-System Pattern (Dezember 2025)

**CSS-Variablen-basiertes Design-System:**
- Konsistente Farben über CSS-Variablen (`--background`, `--foreground`, `--primary`, etc.)
- Utility-Klassen für häufige Patterns (`.btn-primary`, `.card-dark`, etc.)
- Tailwind Config erweitert mit Custom-Farben und Animationen
- Dark Theme als Standard (keine Light-Mode-Variablen nötig)

**Farbschema:**
- **Hintergrund**: Schwarz (`#000000`) als Basis, verschiedene Graustufen für Tiefe
- **Text**: Fast-Weiß (`#f6f6f6`) für Haupttext, Grautöne für Hierarchie
- **Akzente**: Grün für Primary-Aktionen, Rot für Warnungen/Fehler
- **Buttons**: Helles Grau (`#d1d1d1`) auf dunklem Hintergrund für Kontrast

**Design-Prinzipien:**
- Hoher Kontrast für Lesbarkeit
- Minimalistisches, modernes Design
- Konsistente Abstände und Radien
- Subtile Animationen für Interaktivität

## Wichtige Komponenten-Beziehungen

```
Hero
  └── ProjectWizard (Modal)
  └── (VoiceAgent entfernt)

ProjectWizard (Modal)
  └── API: /api/analyze-project
  └── API: /api/submit-project

WizardLanding (Standalone)
  └── Route: /wizard
  └── API: /api/analyze-project
  └── API: /api/submit-project
  └── StartStep mit "Über mich" Section
  └── Tech Stack Logos

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

