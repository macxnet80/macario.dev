# 🖼️ Image Upload Troubleshooting

## Problem: "hostname not configured under images"

### Fehlermeldung:
```
Error: Invalid src prop (...supabase.co/...) on `next/image`, 
hostname "xyz.supabase.co" is not configured under images in your `next.config.js`
```

### Ursache:
Next.js blockiert externe Images aus Sicherheitsgründen. Supabase-Domains müssen explizit erlaubt werden.

### ✅ Lösung:

Die `next.config.js` wurde bereits aktualisiert mit:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*.supabase.co',
      port: '',
      pathname: '/storage/v1/object/public/**',
    },
    {
      protocol: 'https',
      hostname: 'gskragygntljpurdaqqf.supabase.co', // Ihre spezifische Domain
      port: '',
      pathname: '/storage/v1/object/public/**',
    }
  ],
}
```

### 🔄 Nach Änderung der next.config.js:

1. **Development Server neustarten** (wichtig!)
   ```bash
   npm run dev
   ```

2. **Testen Sie den Image Upload** im Admin-Panel

3. **Bilder sollten jetzt korrekt angezeigt werden**

## Weitere Image-Probleme

### Problem: Bild wird nicht angezeigt
- **Prüfen Sie:** URL in der Browser-Konsole
- **Testen Sie:** Direkte URL im Browser öffnen
- **Lösung:** Storage-Bucket muss "public" sein

### Problem: Upload schlägt fehl
- **Prüfen Sie:** Browser-Konsole für Details
- **Lösung:** `fix-storage-policies.sql` ausführen

### Problem: Datei zu groß
- **Limit:** 5MB pro Datei
- **Lösung:** Bild komprimieren oder verkleinern

## 📝 Hinweise

- **Wildcard `*.supabase.co`** erlaubt alle Supabase-Domains
- **Spezifische Domain** als Fallback für ältere Next.js Versionen
- **Server-Neustart** ist nach `next.config.js` Änderungen erforderlich
- **Bilder werden automatisch optimiert** von Next.js 