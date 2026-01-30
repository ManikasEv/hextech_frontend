# Translation Setup Guide

## Overview
Your site now supports English (EN) and German (DE) translations using the DeepL API. Language switcher flags are available in both navbars.

## Setup Instructions

### 1. Create Environment File
Create a `.env.local` file in the root directory with:

```env
# DeepL API Configuration
VITE_DEEPL_API_KEY=your_deepl_api_key_here

# Web3Forms API Key (for contact form)
VITE_WEB3JS_API_KEY=your_web3forms_key_here
```

### 2. Get Your DeepL API Key
1. Go to [https://www.deepl.com/pro-api](https://www.deepl.com/pro-api)
2. Sign up for a free account
3. Navigate to your account settings
4. Copy your API authentication key
5. Paste it in the `.env.local` file

**Free Plan Includes:**
- 500,000 characters/month
- Perfect for your website needs

### 3. How It Works

#### Automatic Translation
- When a user selects German (🇩🇪), the content automatically translates
- Translations are cached in localStorage for faster loading
- If the user returns to English (🇬🇧), original text is shown

#### Language Switcher
- Desktop: Top-right corner of navbar
- Mobile: Within the mobile menu
- Shows current language flag with dropdown

#### Caching System
- First translation is fetched from DeepL API
- Subsequent views use cached translations
- Cache persists across sessions (localStorage)
- Clears if user clears browser data

### 4. Testing Translation
1. Start your dev server: `npm run dev`
2. Click the language flag in the navbar
3. Select "Deutsch" to see translations
4. Content will translate automatically

### 5. Adding New Translatable Content

To make text translatable, wrap it with the `t()` function:

```jsx
import { useTranslation } from '../contexts/TranslationContext';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('Your Text Here')}</h1>
      <p>{t('Another piece of text')}</p>
    </div>
  );
};
```

### 6. What's Been Updated

✅ **Navbar** - Language switcher with EN/DE flags  
✅ **Navbar Careers** - Language switcher  
✅ **Careers Page** - Updated with:
   - "No Available Positions Right Now" message
   - Email changed to `info@hextech.ch`
   - All text translatable
   
✅ **Contact Form** - Animation now triggers once (not repeatedly)

### 7. File Structure

```
src/
├── contexts/
│   └── TranslationContext.jsx      # Translation provider & logic
├── components/
│   └── LanguageSwitcher.jsx        # Language dropdown component
├── hooks/
│   └── useTranslate.js             # Translation hooks
└── App.jsx                          # Wrapped with TranslationProvider
```

### 8. API Usage Tips

**Free Tier Limits:**
- 500,000 characters per month
- Monitor usage in your DeepL dashboard
- Caching significantly reduces API calls

**Character Estimation:**
- Your full website ≈ ~10,000 characters
- One full translation ≈ 10,000 chars
- With caching, you can serve ~50 users/month before translations are fully cached
- After caching, no API calls needed

### 9. Troubleshooting

**Issue:** "DeepL API key not found"
- **Solution:** Ensure `.env.local` exists and has the correct key
- Restart dev server after adding the key

**Issue:** Translations not showing
- **Solution:** Check browser console for errors
- Verify API key is valid in DeepL dashboard

**Issue:** Translations keep fetching
- **Solution:** Clear localStorage and cache
- Check that caching is working in browser DevTools

### 10. Production Deployment

When deploying to Vercel/Netlify/etc:
1. Add `VITE_DEEPL_API_KEY` to environment variables
2. Keep the key secret (never commit to git)
3. `.env.local` is gitignored by default

## Support

For issues with:
- **DeepL API**: [https://support.deepl.com](https://support.deepl.com)
- **Translation Implementation**: Check browser console for detailed errors

