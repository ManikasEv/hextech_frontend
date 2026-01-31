# 🚀 Netlify Deployment Checklist

## 📋 Steps to Deploy with Translations

### 1️⃣ **Add Environment Variable in Netlify**
1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site (`hextech-it.ch`)
3. Go to **Site configuration** → **Environment variables**
4. Click **Add a variable**
5. Add:
   - **Key:** `DEEPL_API_KEY`
   - **Value:** `e25a0f36-6e20-41f8-92cf-92026d654cdd:fx`
6. Click **Create variable**

### 2️⃣ **Commit & Push Changes**
```bash
git add .
git commit -m "Add Netlify function for DeepL translations"
git push origin main
```

### 3️⃣ **Netlify Auto-Deploy**
- Netlify will automatically detect the changes
- It will build your site with the new function
- Wait ~2-3 minutes for deployment

### 4️⃣ **Verify Deployment**
1. Visit: https://hextech-it.ch
2. Switch to German (DE)
3. Check console - no more 404 errors!

---

## 📁 What Changed?

### New Files Created:
- ✅ `netlify/functions/translate.js` - Serverless function to proxy DeepL API
- ✅ `netlify.toml` - Netlify configuration with redirects

### Modified Files:
- ✅ `src/contexts/TranslationContext.jsx` - Removed client-side API key (now server-side)
- ✅ `.gitignore` - Added Netlify folder

---

## 🔒 Security Improvements
- ✅ **API key now server-side** (not exposed in browser)
- ✅ **No API key in code** (uses Netlify environment variables)
- ✅ **No CORS issues** (function runs on same domain)

---

## 🎯 Expected Behavior

### ✅ Before (Development with Vite):
- Works with Vite proxy
- API key in `.env.local`

### ✅ After (Production on Netlify):
- Works with Netlify function
- API key in Netlify environment variables
- Same `/api/deepl/v2/translate` endpoint works everywhere

---

## 🧪 Testing in Development

After pushing, you can also test locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run dev server with functions
netlify dev
```

This will run both your Vite app AND the Netlify function locally!

---

## 🚨 If You Get Errors

### Function not found:
- Check that `netlify/functions/translate.js` exists
- Verify `netlify.toml` is in root directory

### 500 Error:
- Check environment variable is set in Netlify dashboard
- Verify variable name is exactly `DEEPL_API_KEY`

### Still 404:
- Clear browser cache
- Hard refresh: Ctrl+Shift+R
- Check Netlify deploy logs for errors

---

## 📞 Next Steps

1. Add the environment variable in Netlify
2. Push your code
3. Wait for deployment
4. Test the live site

**The translations will work automatically!** 🎉
