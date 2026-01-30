# 🔧 Troubleshooting Guide

## Issue: Translation not working

### Step 1: Run Diagnostics

Open browser console (F12) and run:
```javascript
runDiagnostics()
```

### Step 2: Check API Key

Run in console:
```javascript
console.log(import.meta.env.VITE_DEEPL_API_KEY)
```

**Expected output:** `e25a0f36-6e20-41f8-92cf-92026d654cdd:fx`
**If undefined:** API key not loaded - restart server

### Step 3: Manual API Test

Run in console:
```javascript
fetch('https://api-free.deepl.com/v2/translate', {
  method: 'POST',
  headers: {
    'Authorization': 'DeepL-Auth-Key e25a0f36-6e20-41f8-92cf-92026d654cdd:fx',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: ['Hello'],
    target_lang: 'DE'
  })
})
.then(r => r.json())
.then(d => console.log('Translation:', d))
.catch(e => console.error('Error:', e))
```

**Expected output:** `{ translations: [{ text: "Hallo", ... }] }`

### Step 4: Check Browser Console for Errors

Look for:
- Red error messages
- "DeepL API key not found"
- "403 Forbidden"
- Network errors

### Step 5: Verify File Exists

Run in terminal:
```bash
cat .env.local
```

Should show:
```
VITE_DEEPL_API_KEY=e25a0f36-6e20-41f8-92cf-92026d654cdd:fx
```

### Step 6: Restart Server

```bash
# Stop server: Ctrl+C
npm run dev
```

### Step 7: Clear Cache

In browser console:
```javascript
localStorage.clear()
location.reload()
```

## Common Errors & Solutions

### "API key not found"
- **Cause:** `.env.local` not loaded
- **Solution:** Restart dev server

### "403 Forbidden"
- **Cause:** Invalid API key
- **Solution:** Check key at https://www.deepl.com/account/summary

### "456 Quota exceeded"
- **Cause:** Monthly limit reached
- **Solution:** Check usage at https://www.deepl.com/account/usage

### Language switcher not visible
- **Cause:** Component not rendering
- **Solution:** Check React DevTools, verify TranslationProvider

### Clicking German does nothing
- **Cause:** API error or cache issue
- **Solution:** Check console for errors, clear localStorage

## Debug Checklist

- [ ] `.env.local` file exists in project root
- [ ] API key is correct (check for typos)
- [ ] Dev server restarted after creating `.env.local`
- [ ] Browser console shows no errors
- [ ] Language flag visible in navbar
- [ ] `runDiagnostics()` passes all tests
- [ ] Internet connection working

## Contact Info

If still not working, provide:
1. Output of `runDiagnostics()`
2. Browser console errors
3. Screenshot of navbar
4. Output of `cat .env.local`
