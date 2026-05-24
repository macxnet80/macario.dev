# Tech Context

## Technologien

### Core Framework
- **Next.js 16.0.5**: React Framework mit App Router (aktualisiert von 14.2.3)
- **React 19.2.0**: UI Library (aktualisiert von 18.3.1)
- **React-DOM 19.2.0**: React DOM Library (aktualisiert von 18.3.1)
- **TypeScript 5**: Type Safety

### Styling & UI
- **Tailwind CSS 3.4.1**: Utility-first CSS
- **Framer Motion 11.18.2**: Animationen
- **Radix UI**: Headless UI Components
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-select`
  - `@radix-ui/react-avatar`
  - `@radix-ui/react-slot`
- **shadcn/ui**: UI Component Library
- **lucide-react**: Icons

#### CSS Design-System (Dezember 2025)
- **Farbsystem**: CSS-Variablen basierend auf Startseite
  - Hintergrund: `#000000` (Haupt), `#121212` (Sekundär), `#0a0a0a` (Tertiär), `#1a1a1a` (Hover)
  - Text: `#f6f6f6` (Haupt), `#e7e7e7` (Sekundär), `#b0b0b0` (Gedämpft)
  - Primary: Grün (`green-500`, `green-400`)
  - Accent: `#d1d1d1` (Button-Farbe)
- **Utility-Klassen**: `.btn-primary`, `.btn-secondary`, `.card-dark`, `.card-glass`, `.glow`, `.glow-cyan`, `.glow-primary`
- **Animationen**: `fade-in`, `slide-up`, `bounce-in`, `pulse-glow`
- **Scrollbar**: Custom Styles für Webkit und Firefox
- **Accessibility**: Focus-States, Reduced-Motion-Support

### Backend & Database
- **Supabase**: Backend-as-a-Service
  - PostgreSQL Database
  - Authentication
  - Storage
  - Realtime Subscriptions
- **@supabase/supabase-js 2.50.2**: Supabase Client

**Datenbank-Struktur (public.project_requests):**
- Speichert Projektanfragen direkt aus dem Project Wizard
- Felder: `first_name`, `last_name`, `name`, `email`, `phone`, `company`, `project_type`, `budget`, `timeline`, `priority`, `description`, `features`, `final_price`, `source`, `lead_source`, `privacy_accepted`, `marketing_accepted`, `ai_analysis`, `status`
- **Wichtig:** Nur Label-Felder werden gespeichert (z.B. `timeline`, `priority`, `source`, `project_type`), keine separaten ID-Felder

**Speicher-Flow:**
- `POST /api/submit-project` schreibt direkt in Supabase `project_requests`
- Server-seitiger Client via `SUPABASE_SERVICE_ROLE_KEY` (Fallback: Anon Key)
- Success nur bei erfolgreichem DB-Insert

### AI Integration
- **OpenAI API 4.104.0**: Für KI-Features
  - Projektanalyse (`analyze-project`)
  - Ideen-Generierung (`generate-idea`)
  - Angebots-Optimierung (`optimize-offer`)
  - Briefing-Optimierung (`optimize-briefing`)

### Utilities
- **Zod 3.25.76**: Schema Validation
- **clsx**: Conditional Class Names
- **tailwind-merge**: Tailwind Class Merging
- **class-variance-authority**: Component Variants

### Development Tools
- **ESLint 9.39.1**: Code Linting (aktualisiert von 8)
- **eslint-config-next 16.0.5**: Next.js ESLint Config (aktualisiert von 14.2.3)
- **TypeScript**: Type Checking
- **PostCSS**: CSS Processing
- **Autoprefixer**: CSS Vendor Prefixes

### Marketing & SEO
- **Wizard Landingpage**: Standalone-Version des ProjectWizard unter `/wizard`
- **SEO-hidden**: Route `/wizard` ist für Suchmaschinen verborgen (`robots: { index: false, follow: false }`)
- **robots.txt**: `/wizard/` explizit disallow für zusätzliche Absicherung

## Development Setup

### Environment Variables

Wichtige Environment Variables (in `.env.local`):
- `OPENAI_API_KEY`: Für OpenAI API
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key
- `SUPABASE_SERVICE_ROLE_KEY`: Für serverseitige Inserts (Projektanfragen, Storage)

### Build & Deploy

```bash
npm run dev      # Development Server
npm run build    # Production Build
npm run start    # Production Server
npm run lint     # Linting
```

### Dependencies Management

- **npm**: Package Manager
- **package.json**: Dependencies Definition
- Regelmäßige Updates empfohlen

## Technische Constraints

- **Next.js App Router**: Muss verwendet werden (nicht Pages Router)
- **Server Components**: Wo möglich für Performance
- **Client Components**: Für Interaktivität (`'use client'`)
- **API Routes**: Für Backend-Logik
- **Supabase RLS**: Sicherheit auf Datenbank-Ebene

## Next.js 16 Breaking Changes (behoben)

### Asynchrone Route Handler Parameter
- Route Handler Parameter sind jetzt `Promise<{ param: string }>` statt `{ param: string }`
- Alle Route Handler verwenden jetzt `await params`
- Betroffene Dateien:
  - `app/api/onboarding-session/[token]/route.ts`

### Asynchrone Cookies API
- `cookies()` aus `next/headers` ist jetzt async
- Alle Verwendungen verwenden jetzt `await cookies()`
- Betroffene Dateien:
  - `app/api/admin/login/route.ts`
  - `app/api/admin/logout/route.ts`
  - `lib/auth-utils.ts` (alle Auth-Funktionen sind jetzt async)

### Metadata API Verbesserungen
- `metadataBase` und `alternates.canonical` hinzugefügt
- Microsoft Tile Meta-Tags über `metadata.other` verwaltet
- Viewport-Meta-Tag wird automatisch von Next.js verwaltet

## Browser Support

- Moderne Browser (Chrome, Firefox, Safari, Edge)
- Responsive Design (Mobile-first)
- Progressive Enhancement

## Performance Optimierungen

- Next.js Image Optimization
- Code Splitting automatisch
- Static Generation wo möglich
- Optimierte Package Imports (`optimizePackageImports`)

## Entfernte Dependencies

Folgende Dependencies wurden entfernt (Voice Agent):
- `@openai/agents`: OpenAI Agents SDK
- `react-voice-visualizer`: Voice Visualisierung
- `react-audio-visualize`: Audio Visualisierung
- `react-audio-visualizer-pro`: Audio Visualisierung Pro

