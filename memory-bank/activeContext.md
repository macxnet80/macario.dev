# Active Context

## Aktueller Fokus

**Datum**: Dezember 2025

### Letzte Änderungen

1. **Wizard Landingpage erstellt** (Dezember 2025)
   - Neue Route `/wizard` für Instagram-Kampagnen
   - Standalone-Version des ProjectWizard als Landingpage
   - StartStep mit Headline "Deine Idee. Deine Website."
   - "Über mich" Section mit Bild und Text unter dem CTA
   - Tech Stack Logos zwischen CTA und Bild (Cursor, Supabase, n8n, Vercel, React, OpenAI)
   - SEO-hidden (`robots: { index: false, follow: false }`)
   - Mobile-optimiert mit fixierter Progress Bar und Content Box
   - CTA Button: "Kostenlos starten" mit optimiertem Padding
   - Text-Anpassungen: "wir"/"uns" → "ich"/"mir" in beiden Wizards
   
   **Neue Dateien:**
   - `app/wizard/page.tsx` - Hauptseite für Wizard Landingpage
   - `app/wizard/layout.tsx` - Layout mit SEO-hidden Metadata
   - `components/WizardLanding.tsx` - Standalone Wizard-Komponente
   
   **Geänderte Dateien:**
   - `components/ProjectWizard.tsx` - E-Commerce → AI Voice Agent, "wir"/"uns" → "ich"/"mir"
   - `components/Hero.tsx` - CTA ohne Zeilenumbruch
   - `app/api/analyze-project/route.ts` - E-Commerce → AI Voice Agent
   - `app/api/submit-project/route.ts` - Marketing-Frage wird übergeben
   - `public/robots.txt` - `/wizard/` disallow hinzugefügt

2. **ProjectWizard Anpassungen** (Dezember 2025)
   - Projekttyp "E-Commerce" durch "AI Voice Agent" ersetzt
   - Alle Texte von "wir"/"uns" auf "ich"/"mir" geändert (erste Person Singular)
   - Placeholder-Text in Projektbeschreibung strukturiert ohne Bullet Points
   - Marketing-Frage wird an Webhook übergeben

3. **CSS Design-System Überarbeitung** (Dezember 2025)
   - Globales CSS komplett neu strukturiert basierend auf der Startseite
   - Konsistentes Farbsystem mit CSS-Variablen implementiert
   - Neue Utility-Klassen für Buttons, Cards und Glow-Effekte
   - Tailwind Config erweitert mit neuen Farben und Animationen
   - Scrollbar-Styles für Webkit und Firefox optimiert
   - Accessibility-Verbesserungen (Focus-States, Reduced-Motion)
   
   **Neue CSS-Variablen:**
   - Hintergrundfarben: `--background`, `--background-secondary`, `--background-tertiary`, `--background-hover`
   - Textfarben: `--foreground`, `--foreground-secondary`, `--foreground-muted`
   - Primary: `--primary`, `--primary-light` (Grün)
   - Accent: `--accent` (#d1d1d1 für Buttons)
   - Spezielle Effekte: `--glow-cyan`, `--glow-green`
   
   **Neue Utility-Klassen:**
   - `.btn-primary` - Heller Button auf dunklem Hintergrund
   - `.btn-secondary` - Dunkler Button mit Border
   - `.card-dark` - Karten-Style wie in SkillsSection
   - `.card-glass` - Glasmorphismus-Effekt
   - `.glow`, `.glow-cyan`, `.glow-primary` - Verschiedene Glow-Effekte
   
   **Betroffene Dateien:**
   - `app/globals.css` - Komplett überarbeitet
   - `tailwind.config.ts` - Erweitert mit neuen Farben und Animationen

2. **Next.js 16 Upgrade** (November 2024)
   - Next.js von 14.2.3 auf 16.0.5 aktualisiert
   - React von 18.3.1 auf 19.2.0 aktualisiert
   - React-DOM von 18.3.1 auf 19.2.0 aktualisiert
   - ESLint von 8 auf 9.39.1 aktualisiert
   - eslint-config-next von 14.2.3 auf 16.0.5 aktualisiert
   - @types/react und @types/react-dom aktualisiert
   
   **Breaking Changes behoben**:
   - Route Handler Parameter sind jetzt asynchron (`await params`)
   - Cookies API ist jetzt asynchron (`await cookies()`)
   - Alle Auth-Funktionen sind jetzt async (`await getSession()`, `await requireAuth()`)
   - Metadata API erweitert mit `metadataBase` und `alternates.canonical`
   - TypeScript-Kompatibilität für React 19 sichergestellt
   
   **Betroffene Dateien**:
   - `app/api/onboarding-session/[token]/route.ts`
   - `app/api/admin/login/route.ts`
   - `app/api/admin/logout/route.ts`
   - `lib/auth-utils.ts`
   - `app/api/admin/me/route.ts`
   - `app/api/admin/optimize-briefing/route.ts`
   - `app/api/admin/onboarding-sessions/route.ts`
   - `app/api/admin/test-supabase/route.ts`
   - `app/layout.tsx`
   - `components/ui/shadcn-io/code-block/index.tsx`

2. **Voice Agent entfernt** (Dezember 2024)
   - Alle Voice Agent Komponenten wurden komplett entfernt
   - `components/VoiceAgent.tsx` gelöscht
   - `components/VoiceAgentButton.tsx` gelöscht
   - Alle API Routes unter `app/api/voice/` gelöscht
   - Referenzen in `components/Hero.tsx` entfernt
   - Dependencies aus `package.json` entfernt:
     - `@openai/agents`
     - `react-voice-visualizer`
     - `react-audio-visualize`
     - `react-audio-visualizer-pro`

### Aktueller Stand

Die Website läuft jetzt auf:
- **Next.js 16.0.5**: Neueste Version mit Turbopack als Standard-Bundler
- **React 19.2.0**: Neueste React-Version mit verbesserten Features
- **Build erfolgreich**: Alle TypeScript-Fehler behoben, alle Routen kompilieren korrekt

Die Website fokussiert sich auf:
- **ProjectWizard**: Haupt-Tool für Projektanfragen
- **CustomerOnboardingWizard**: Onboarding-Prozess
- **Portfolio-Präsentation**: ProjectShowcase

### Nächste Schritte

- ✅ Next.js 16 Upgrade abgeschlossen
- ✅ Alle Breaking Changes behoben
- ✅ Build erfolgreich
- ✅ CSS Design-System überarbeitet und konsolidiert
- ✅ Wizard Landingpage für Instagram-Kampagnen erstellt
- ✅ ProjectWizard Anpassungen (AI Voice Agent, erste Person Singular)
- Projekt läuft stabil auf Next.js 16
- Konsistentes Design-System implementiert
- Wizard Landingpage bereit für Marketing-Kampagnen
- Fokus auf bestehende Features optimieren
- Weitere Features können hinzugefügt werden

## Aktive Entscheidungen

- **Next.js 16**: Upgrade erfolgreich durchgeführt, alle Breaking Changes behoben
- **React 19**: Kompatibilität sichergestellt, TypeScript-Fehler behoben
- **CSS Design-System**: Konsolidiertes Farbsystem basierend auf Startseite, CSS-Variablen für Konsistenz
- **Voice Agent**: Entschieden, komplett zu entfernen
- **ProjectWizard**: Bleibt Haupt-Tool für Lead-Generierung
- **Wizard Landingpage**: Neue Standalone-Version für Marketing-Kampagnen (Instagram)
- **Terminbuchung**: Über ProjectWizard, nicht mehr über Voice Agent
- **Projekttyp**: "E-Commerce" durch "AI Voice Agent" ersetzt
- **Sprache**: Erste Person Singular ("ich"/"mir") statt "wir"/"uns" in Wizards

## Offene Fragen

- Keine aktuell

