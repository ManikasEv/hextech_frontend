# DeepL API Translation Setup Guide

## 🌍 Overview
Your website now supports **multi-language translation** using the DeepL API. All text content is automatically translated in real-time with intelligent caching.

---

## 📋 Quick Start

### Step 1: Sign Up for DeepL API

1. **Visit the DeepL API Plans Page:**
   - Go to [https://www.deepl.com/pro-api](https://www.deepl.com/pro-api)
   - Click **"Sign up for free"**

2. **Create a New Account:**
   - ⚠️ **Important:** If you already have a DeepL Translator account, you need to **log out** and create a **new account** specifically for the API
   - The Translator account and API account are separate

3. **Choose the Free Plan:**
   - ✅ **500,000 characters/month** (perfect for most websites)
   - No credit card required
   - Upgrade later if needed

### Step 2: Get Your API Key

1. After signing up, go to your **Account Settings**
2. Navigate to the **API Keys** section
3. Copy your **Authentication Key**
4. ⚠️ Keep this key **secret** - never commit it to Git!

### Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# DeepL API Configuration
VITE_DEEPL_API_KEY=your_deepl_api_key_here

# Web3Forms API Key (for contact form)
VITE_WEB3JS_API_KEY=your_web3forms_key_here
```

**Replace `your_deepl_api_key_here` with your actual API key.**

### Step 4: Test Your Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test translation:**
   - Open your website in the browser
   - Look for the **language switcher** (flag icon) in the navbar
   - Click it and select **German (Deutsch)** 🇩🇪
   - Watch the content automatically translate!

3. **Check the browser console:**
   - Open DevTools (F12)
   - You should see: `"Translating: [text] to de"`
   - Followed by: `"Translation result: [translated text]"`

---

## 🔧 How It Works

### Architecture

```
User selects language (DE)
        ↓
<T> component detects change
        ↓
Check localStorage cache
        ↓
   Cache hit?
   ↙       ↘
 YES       NO
  ↓         ↓
Return   Call DeepL API
cached      ↓
text    Save to cache
        ↓
    Display translation
```

### Translation Component Usage

Wrap any text with the `<T>` component to make it translatable:

```jsx
import T from '../components/T';

function MyComponent() {
  return (
    <div>
      <h1><T>Welcome to our website</T></h1>
      <p><T>This text will be automatically translated</T></p>
      <button><T>Click me</T></button>
    </div>
  );
}
```

### Context API Method

For more complex scenarios, use the `useTranslation` hook:

```jsx
import { useTranslation } from '../contexts/TranslationContext';

function MyComponent() {
  const { language, t, changeLanguage } = useTranslation();
  
  return (
    <div>
      <p>Current language: {language}</p>
      <p>{t('This is translated text')}</p>
      <button onClick={() => changeLanguage('de')}>
        Switch to German
      </button>
    </div>
  );
}
```

---

## 🌐 Supported Languages

Currently configured:
- 🇬🇧 **English (en)** - Default
- 🇩🇪 **German (de)** - German

### Adding More Languages

To add more languages, update `src/components/LanguageSwitcher.jsx`:

```jsx
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];
```

**DeepL supports 30+ languages!** See the full list at [DeepL Supported Languages](https://www.deepl.com/docs-api/translate-text/)

---

## 💾 Caching System

### How Caching Works

1. **First Request:** Text is translated via DeepL API
2. **Automatic Cache:** Translation is stored in `localStorage`
3. **Subsequent Requests:** Cached translation is used (no API call)
4. **Persistence:** Cache survives browser refresh
5. **Clear Cache:** User clearing browser data resets cache

### Cache Structure

```javascript
{
  "Hello World_de": "Hallo Welt",
  "Welcome_de": "Willkommen",
  "Learn More_de": "Mehr erfahren"
}
```

### Benefits

- ⚡ **Instant loading** after first translation
- 💰 **Reduced API costs** (fewer character requests)
- 🌐 **Offline support** for already-translated content

---

## 📊 API Usage & Limits

### Free Plan

- **500,000 characters/month**
- **No credit card required**
- Perfect for small to medium websites

### Estimating Your Usage

Example calculation:
```
Average webpage: ~5,000 characters
Full website (10 pages): ~50,000 characters
One complete translation: 50,000 chars

With caching:
- First 10 users: 50,000 × 10 = 500,000 chars
- After that: 0 chars (cache used)

Result: ~10 unique users per language per month
```

### Monitoring Usage

1. Log into your [DeepL Account](https://www.deepl.com/account/usage)
2. View **Character usage** statistics
3. Track by month

### Upgrading

If you exceed limits:
- **DeepL Pro Plan:** Starting at $5.99/month
- **1,000,000+ characters/month**
- No character limits on higher tiers

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep API key in `.env.local`
- Add `.env.local` to `.gitignore` (already done)
- Use environment variables in production (Vercel, Netlify, etc.)
- Rotate keys periodically

### ❌ DON'T:
- Commit API keys to Git
- Share keys publicly
- Use same key across multiple projects
- Hardcode keys in source files

---

## 🚀 Production Deployment

### Vercel

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add:
   - **Name:** `VITE_DEEPL_API_KEY`
   - **Value:** Your API key
   - **Environments:** Production, Preview, Development
4. Redeploy

### Netlify

1. Go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Add:
   - **Key:** `VITE_DEEPL_API_KEY`
   - **Value:** Your API key
4. Redeploy

### Other Platforms

Most hosting platforms support environment variables. Check their documentation for:
- Heroku: Config Vars
- AWS: Parameter Store / Secrets Manager
- Azure: App Settings

---

## 🐛 Troubleshooting

### Issue: "DeepL API key not found"

**Solution:**
```bash
# 1. Check if .env.local exists
ls -la .env.local

# 2. Verify the key is set
cat .env.local

# 3. Restart dev server
npm run dev
```

### Issue: Translations not showing

**Possible causes:**
1. **Invalid API key**
   - Check console for 403 error
   - Verify key in DeepL dashboard
   
2. **Network error**
   - Check browser DevTools → Network tab
   - Look for failed requests to `api-free.deepl.com`

3. **Cache issue**
   - Clear localStorage: `localStorage.clear()`
   - Refresh page

### Issue: API limit exceeded

**Solutions:**
- **Check usage:** [DeepL Account Usage](https://www.deepl.com/account/usage)
- **Wait for next month:** Free plan resets monthly
- **Upgrade plan:** Consider DeepL Pro

### Issue: Some text not translating

**Check if text is wrapped:**
```jsx
// ❌ NOT translatable
<h1>Hello World</h1>

// ✅ Translatable
<h1><T>Hello World</T></h1>
```

---

## 📁 File Structure

```
src/
├── contexts/
│   └── TranslationContext.jsx    # Core translation logic & DeepL API
├── components/
│   ├── T.jsx                      # Translation wrapper component
│   └── LanguageSwitcher.jsx       # Language selector dropdown
├── hooks/
│   └── useTranslate.js            # Translation hooks
└── App.jsx                         # Wrapped with TranslationProvider
```

---

## 🧪 Testing Your Translation

### Test Request with cURL

```bash
curl -X POST https://api-free.deepl.com/v2/translate \
  -H "Authorization: DeepL-Auth-Key YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":["Hello, world!"],"target_lang":"DE"}'
```

**Expected response:**
```json
{
  "translations": [
    {
      "detected_source_language": "EN",
      "text": "Hallo, Welt!"
    }
  ]
}
```

### Test in Browser Console

```javascript
// Check if API key is loaded
console.log(import.meta.env.VITE_DEEPL_API_KEY ? 'API key found' : 'API key missing');

// Check cached translations
console.log(JSON.parse(localStorage.getItem('translations')));

// Check current language
console.log(localStorage.getItem('language'));
```

---

## 📚 Additional Resources

### Official Documentation
- [DeepL API Docs](https://www.deepl.com/docs-api)
- [DeepL API Reference](https://www.deepl.com/docs-api/translate-text/)
- [Supported Languages](https://www.deepl.com/docs-api/translate-text/translate-text/)

### Community
- [DeepL API Forum](https://community.deepl.com/)
- [Stack Overflow - DeepL Tag](https://stackoverflow.com/questions/tagged/deepl)

### Your Project
- Translation Context: `src/contexts/TranslationContext.jsx`
- T Component: `src/components/T.jsx`
- Language Switcher: `src/components/LanguageSwitcher.jsx`

---

## 🎯 Next Steps

1. ✅ **Sign up for DeepL API** (if not done)
2. ✅ **Add API key to `.env.local`**
3. ✅ **Test translation** with language switcher
4. 🔄 **Add more languages** (optional)
5. 📱 **Test on mobile devices**
6. 🚀 **Deploy to production** with environment variables

---

## 💡 Tips & Best Practices

### Optimization
- ✅ Use the `<T>` component for all user-facing text
- ✅ Keep sentences complete (better translations)
- ✅ Avoid translating technical terms (variable names, code)
- ✅ Let caching do its magic

### Content Guidelines
```jsx
// ✅ Good: Complete sentences
<T>Welcome to our website. We build amazing software.</T>

// ❌ Avoid: Fragmented text
<T>Welcome to</T> our <T>website</T>
```

### Performance
- Translations happen in the background
- First load: Small delay for API call
- Subsequent loads: Instant (cached)
- No impact on SEO (content is rendered)

---

## ❓ FAQ

### Q: Does this work with paid DeepL plans?
**A:** Yes! Just update the API URL:
```javascript
// Free plan (default)
https://api-free.deepl.com/v2/translate

// Pro plan
https://api.deepl.com/v2/translate
```

### Q: Can I translate document files?
**A:** DeepL API supports document translation, but this setup is for web text only. Check [Document Translation API](https://www.deepl.com/docs-api/translate-documents/) for file support.

### Q: Is the translation quality good?
**A:** DeepL is known for high-quality, natural-sounding translations. It often outperforms competitors like Google Translate.

### Q: Can I use this offline?
**A:** Once text is translated and cached, it works offline. New translations require internet.

### Q: How do I clear the translation cache?
**A:** Run in browser console: `localStorage.removeItem('translations')`

---

## 🎉 Success!

Your website now supports **professional-grade multilingual translation** powered by DeepL AI. Users can switch languages instantly with intelligent caching for optimal performance.

**Need help?** Check the troubleshooting section or open an issue in your project repository.

---

**Last updated:** January 30, 2026
**DeepL API Version:** v2
**Project:** Hextech Web Company
