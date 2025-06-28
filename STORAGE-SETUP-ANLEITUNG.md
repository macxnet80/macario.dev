# 📦 Storage Setup - Manuelle Anleitung

Da die automatischen SQL-Scripts Storage-Berechtigungen benötigen, die normale Benutzer nicht haben, folgen Sie dieser manuellen Anleitung:

## 🗄️ Schritt 1: Datenbank Setup

1. **Gehe zu Supabase Dashboard** → Dein Projekt → **SQL Editor**
2. **Kopiere den Inhalt** von `supabase-simple-setup.sql`
3. **Füge das Script ein** und klicke **"Run"**
4. **Überprüfe** in "Table Editor", ob die `projects` Tabelle erstellt wurde

## 📁 Schritt 2: Storage Bucket erstellen

### Option A: Über das Dashboard (Empfohlen)

1. **Gehe zu "Storage"** in der Supabase Sidebar
2. **Klicke "New bucket"**
3. **Bucket-Konfiguration:**
   - **Name:** `project-images`
   - **Public bucket:** ✅ **AKTIVIEREN** (sehr wichtig!)
   - **File size limit:** `5 MB`
   - **Allowed MIME types:** `image/jpeg, image/png, image/webp, image/gif`
4. **Klicke "Create bucket"**

### Option B: Bucket-Einstellungen prüfen

Falls der Bucket bereits existiert, aber Upload nicht funktioniert:

1. **Gehe zu Storage** → **project-images**
2. **Klicke auf das Zahnrad-Icon** (Settings)
3. **Stelle sicher:**
   - ✅ **Public bucket** ist aktiviert
   - ✅ **File size limit** ist mindestens 5MB
   - ✅ **Allowed MIME types** enthält Bildformate

## 🔐 Schritt 3: Storage Policies (Falls Upload immer noch fehlschlägt)

### Über das Dashboard:

1. **Gehe zu Storage** → **Policies**
2. **Für den "project-images" Bucket** sollten folgende Policies existieren:
   - **SELECT (Read):** Öffentlich zugänglich
   - **INSERT (Upload):** Öffentlich zugänglich
   - **UPDATE:** Öffentlich zugänglich  
   - **DELETE:** Öffentlich zugänglich

### Falls Policies fehlen, erstelle sie:

1. **Klicke "New Policy"**
2. **Wähle "For full customization"**
3. **Erstelle diese 4 Policies:**

#### Policy 1: Read Access
```
Policy name: project_images_select
Table: objects
Operation: SELECT
Target roles: public
USING expression: bucket_id = 'project-images'
```

#### Policy 2: Upload Access
```
Policy name: project_images_insert
Table: objects
Operation: INSERT
Target roles: public
WITH CHECK expression: bucket_id = 'project-images'
```

#### Policy 3: Update Access
```
Policy name: project_images_update
Table: objects
Operation: UPDATE
Target roles: public
USING expression: bucket_id = 'project-images'
WITH CHECK expression: bucket_id = 'project-images'
```

#### Policy 4: Delete Access
```
Policy name: project_images_delete
Table: objects
Operation: DELETE
Target roles: public
USING expression: bucket_id = 'project-images'
```

## ✅ Schritt 4: Test

1. **Starte den Development Server:** `npm run dev`
2. **Besuche:** `http://localhost:3000/admin`
3. **Logge dich ein** mit dem Passwort aus `.env.local`
4. **Teste den Bildupload** bei einem neuen/bestehenden Projekt

## 🚨 Troubleshooting

### Problem: "Bucket not found"
- **Lösung:** Überprüfe, dass der Bucket `project-images` existiert
- **Stelle sicher:** Bucket-Name ist exakt `project-images` (ohne Leerzeichen)

### Problem: "Upload failed" / "Permission denied"
- **Lösung:** Bucket muss als **"Public"** markiert sein
- **Prüfe:** Storage Policies sind korrekt gesetzt

### Problem: "File too large"
- **Lösung:** Reduziere die Bildgröße auf unter 5MB
- **Oder:** Erhöhe das File size limit im Bucket

### Problem: "Invalid file type"
- **Lösung:** Verwende nur JPG, PNG, WebP oder GIF Dateien
- **Prüfe:** Allowed MIME types im Bucket

## 📝 Hinweise

- **Der Bucket MUSS öffentlich sein** für Upload und Anzeige
- **Alle Bilder werden öffentlich zugänglich** (normale Verhalten für Portfolio-Bilder)
- **5MB Limit** sollte für die meisten Portfolio-Bilder ausreichen
- **Bei Problemen:** Prüfe die Browser-Konsole für detaillierte Fehlermeldungen

Nach diesem Setup sollte der Bildupload im Admin-Panel einwandfrei funktionieren! 🎉 