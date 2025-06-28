# 🚀 Projekt CMS Setup mit Supabase

Ein einfaches, aber mächtiges Content Management System für die Projekt-Showcase mit Supabase als Backend.

## ✨ Features

- 📝 **Einfache Bearbeitung** - Intuitive Admin-Oberfläche
- 🖼️ **Bildupload** - Drag & Drop Bildupload mit Supabase Storage
- ⚡ **Real-time Updates** - Änderungen werden sofort sichtbar
- 🎨 **Farbschemas** - Vordefinierte Gradient-Optionen
- 📱 **Responsive** - Admin-Panel funktioniert auf allen Geräten
- 🔄 **Drag & Drop Sortierung** - Projekt-Reihenfolge einfach ändern
- 👁️ **Sichtbarkeits-Toggle** - Projekte aktivieren/deaktivieren

## 🛠️ Setup-Anleitung

### 1. Supabase Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com) und erstelle ein kostenloses Konto
2. Klicke auf "New Project"
3. Wähle eine Organisation und gib einen Projektnamen ein
4. Warte bis das Projekt initialisiert ist (ca. 2-3 Minuten)

### 2. Datenbank Setup

**🎯 EMPFOHLENES SETUP (Vermeidet alle Berechtigungsprobleme):**

1. **Datenbank Setup:**
   - Gehe zu deinem Supabase Dashboard → SQL Editor
   - Kopiere den Inhalt der Datei `supabase-simple-setup.sql`
   - Führe das Script aus
   - Überprüfe in "Table Editor", ob die `projects` Tabelle erstellt wurde

2. **Storage Setup:**
   - Folge der detaillierten Anleitung in `STORAGE-SETUP-ANLEITUNG.md`
   - Dies vermeidet alle Berechtigungsprobleme mit Storage-Policies

**Alternative Optionen (Falls das empfohlene Setup nicht funktioniert):**

**Option A: Nur Datenbank** - `supabase-basic-setup.sql`
**Option B: Vollständig** - `supabase-setup.sql` 
**Option C: Mit Storage Fix** - `supabase-complete-fix.sql`

**❌ Bei Fehler "must be owner of table objects":**
- **Verwende das EMPFOHLENE SETUP oben**
- Die Storage-Policies müssen manuell über das Dashboard erstellt werden
- SQL-Scripts haben nicht die nötigen Berechtigungen für Storage-Policies

**✅ Weitere Verbesserungen:**
- Hydration-Fehler wurden behoben
- Fallback-Daten werden angezeigt wenn Supabase nicht verfügbar ist
- Bessere Fehlerbehandlung für alle API-Calls

### 3. Storage Setup

**Option A: Manuell über Dashboard (Einfach)**
1. Gehe zu "Storage" in der Supabase Sidebar
2. Klicke auf "New bucket"
3. Name: `project-images`
4. Aktiviere "Public bucket"
5. Klicke "Create bucket"

**Option B: Per SQL (Bei Upload-Problemen)**
1. Gehe zu "SQL Editor" in Supabase
2. Kopiere den Inhalt der Datei `supabase-storage-permissions.sql`
3. Führe das Script aus
4. Dies erstellt den Bucket und setzt die korrekten Upload-Berechtigungen

**Bei Upload-Fehlern:**
- Stelle sicher, dass der Bucket als "Public" markiert ist
- Führe `supabase-storage-permissions.sql` aus um die RLS-Policies zu setzen
- Prüfe die Browser-Konsole für detaillierte Fehlermeldungen

### 4. API-Credentials abrufen

1. Gehe zu "Settings" → "API" in deinem Supabase Dashboard
2. Kopiere folgende Werte:
   - **Project URL** (beginnt mit `https://`)
   - **anon public key** (langer String)

### 5. Umgebungsvariablen konfigurieren

1. Kopiere `env.example` zu `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Öffne `.env.local` und ersetze die Beispielwerte:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://dein-projekt-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=dein-anon-key-hier
   ADMIN_PASSWORD=dein_sicheres_passwort
   ```

   **⚠️ Wichtig:** Ändere das `ADMIN_PASSWORD` auf ein sicheres Passwort deiner Wahl!

### 6. Abhängigkeiten installieren

```bash
npm install
```

### 7. Development Server starten

```bash
npm run dev
```

## 🎯 Verwendung

### Admin-Panel aufrufen

1. Besuche `http://localhost:3000/admin`
2. Du wirst zur Login-Seite weitergeleitet
3. Gib das in `.env.local` konfigurierte Passwort ein
4. Nach erfolgreichem Login hast du Zugang zum CMS

### Neues Projekt erstellen

1. Klicke auf "Neues Projekt"
2. Fülle alle Felder aus:
   - **Titel**: Name des Projekts
   - **Beschreibung**: Detaillierte Beschreibung
   - **Tools**: Kommagetrennte Liste (z.B. "React, Supabase, Vercel")
   - **Features**: Kommagetrennte Liste der Hauptfunktionen
   - **Farbschema**: Wähle einen Gradient aus
   - **Bild**: Optional - Drag & Drop Upload
3. Klicke "Erstellen"

### Projekt bearbeiten

1. Klicke auf das ✏️ Edit-Icon bei einem Projekt
2. Ändere die gewünschten Felder
3. Klicke "Speichern"

### Projekt-Reihenfolge ändern

- Ziehe Projekte per Drag & Drop (🔄 Handle links)
- Die Reihenfolge wird automatisch gespeichert

### Projekt aktivieren/deaktivieren

- Klicke auf das 👁️ Auge-Icon
- Deaktivierte Projekte sind nicht in der Showcase sichtbar

## 📁 Dateistruktur

```
├── lib/
│   └── supabase.ts          # Supabase Client & API Funktionen
├── hooks/
│   └── useProjects.ts       # React Hooks für Projekte
├── app/
│   └── admin/
│       ├── layout.tsx       # Admin Layout
│       └── page.tsx         # Admin Dashboard
├── components/
│   └── ProjectShowcase.tsx  # Aktualisierte Showcase-Komponente
├── supabase-setup.sql       # Datenbank Setup Script
└── env.example              # Umgebungsvariablen Vorlage
```

## 🔧 Technische Details

### Datenbank Schema

```sql
projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tools TEXT[] NOT NULL,
  features TEXT[] NOT NULL,
  color VARCHAR(100) NOT NULL,
  image_url TEXT,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### API Funktionen

- `projectsApi.getActiveProjects()` - Aktive Projekte abrufen
- `projectsApi.getAllProjects()` - Alle Projekte abrufen (Admin)
- `projectsApi.createProject(project)` - Neues Projekt erstellen
- `projectsApi.updateProject(id, updates)` - Projekt aktualisieren
- `projectsApi.deleteProject(id)` - Projekt löschen
- `storageApi.uploadImage(file, path)` - Bild hochladen

### Real-time Updates

Das System nutzt Supabase Real-time für automatische Updates:
- Änderungen im Admin-Panel werden sofort in der Showcase sichtbar
- Mehrere Admin-Benutzer können gleichzeitig arbeiten
- Keine manuellen Page-Refreshs nötig

## 🛡️ Sicherheit

### Aktueller Status
- ✅ **Passwort-geschütztes Admin-Panel** - Zugang nur mit korrektem Passwort
- ✅ **Session-basierte Authentifizierung** - 24h gültige Login-Sessions
- ✅ **RLS aktiviert** - Datenbank-Sicherheit ist konfiguriert
- ✅ **Öffentlicher Storage** - Bilder sind öffentlich zugänglich
- ✅ **Suchmaschinen-Schutz** - Admin-Bereich ist vor Indexierung geschützt

### Für Produktion empfohlen

1. **Authentifizierung hinzufügen**:
   ```typescript
   // Beispiel: Einfache Passwort-Authentifizierung
   const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
   ```

2. **RLS-Policies verschärfen**:
   ```sql
   -- Nur authentifizierte Benutzer können Projekte verwalten
   CREATE POLICY "Admin only" ON projects
     FOR ALL USING (auth.role() = 'authenticated');
   ```

3. **Rate Limiting implementieren**
4. **CSRF-Schutz hinzufügen**

## 🚀 Deployment

### Vercel Deployment

1. Pushe deinen Code zu GitHub
2. Verbinde das Repository mit Vercel
3. Füge die Umgebungsvariablen in Vercel hinzu:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_PASSWORD`
4. Deploy!

### Netlify Deployment

1. Pushe deinen Code zu GitHub
2. Verbinde das Repository mit Netlify
3. Build Command: `npm run build`
4. Publish Directory: `.next`
5. Füge Umgebungsvariablen hinzu

## 🆘 Troubleshooting

### "Failed to fetch" Fehler
- ✅ Überprüfe die Supabase URL und API Key
- ✅ Stelle sicher, dass RLS-Policies korrekt sind
- ✅ Überprüfe die Netzwerkverbindung

### Bild-Upload funktioniert nicht
- ✅ Führe `supabase-storage-fix.sql` im SQL Editor aus
- ✅ Überprüfe ob der Bucket `project-images` existiert
- ✅ Stelle sicher, dass der Bucket als "public" markiert ist
- ✅ Prüfe die Browser-Konsole auf Fehlermeldungen
- ✅ Teste mit verschiedenen Bildformaten (JPG, PNG, WebP)

### Bilder werden nicht angezeigt
- ✅ Überprüfe, ob der `project-images` Bucket existiert
- ✅ Stelle sicher, dass der Bucket öffentlich ist
- ✅ Überprüfe die Storage-Policies

### Real-time Updates funktionieren nicht
- ✅ Überprüfe die Supabase Real-time Konfiguration
- ✅ Stelle sicher, dass WebSockets nicht blockiert sind
- ✅ Überprüfe Browser-Konsole auf Fehler

## 📈 Erweiterte Features (Roadmap)

- 🔐 **Authentifizierung** - Sicheres Admin-Login
- 📊 **Analytics** - Projekt-View Tracking
- 🏷️ **Kategorien** - Projekt-Kategorisierung
- 🌍 **Mehrsprachigkeit** - Multi-Language Support
- 📝 **Rich Text Editor** - WYSIWYG Beschreibungen
- 🔄 **Versionierung** - Änderungshistorie
- 📱 **Mobile App** - Native Admin-App

## 💡 Support

Bei Fragen oder Problemen:
1. Überprüfe diese Dokumentation
2. Schaue in die Browser-Konsole nach Fehlern
3. Überprüfe die Supabase Dashboard Logs
4. Erstelle ein Issue auf GitHub

---

**Viel Erfolg mit deinem neuen CMS! 🎉** 