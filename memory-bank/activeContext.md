# Active Context

## Aktueller Fokus

**Datum**: November 2024

### Letzte Änderungen

1. **Next.js 16 Upgrade** (November 2024)
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
- Projekt läuft stabil auf Next.js 16
- Fokus auf bestehende Features optimieren
- Weitere Features können hinzugefügt werden

## Aktive Entscheidungen

- **Next.js 16**: Upgrade erfolgreich durchgeführt, alle Breaking Changes behoben
- **React 19**: Kompatibilität sichergestellt, TypeScript-Fehler behoben
- **Voice Agent**: Entschieden, komplett zu entfernen
- **ProjectWizard**: Bleibt Haupt-Tool für Lead-Generierung
- **Terminbuchung**: Über ProjectWizard, nicht mehr über Voice Agent

## Offene Fragen

- Keine aktuell

