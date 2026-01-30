# 🚀 Quick Environment Setup

## Step 1: Create `.env.local` File

Create a new file called `.env.local` in your project root directory with this content:

```env
# DeepL API Configuration
# Get your API key from: https://www.deepl.com/pro-api
VITE_DEEPL_API_KEY=

# Web3Forms API Key (for contact form)
# Get your key from: https://web3forms.com
VITE_WEB3JS_API_KEY=
```

## Step 2: Get Your DeepL API Key

1. Visit: [https://www.deepl.com/pro-api](https://www.deepl.com/pro-api)
2. Click **"Sign up for free"**
3. Create an account (separate from DeepL Translator account)
4. Go to **Account Settings** → **API Keys**
5. Copy your **Authentication Key**
6. Paste it after `VITE_DEEPL_API_KEY=` in your `.env.local` file

Example:
```env
VITE_DEEPL_API_KEY=abc123-your-actual-api-key-here-xyz789:fx
```

## Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Test Your Setup

Open browser console (F12) and run:
```javascript
quickTest()
```

You should see:
```
✅ API key found in environment
🔍 Testing DeepL API connection...
✅ API Connection successful!
📝 Original text: "Hello, world!"
🌍 Translated text: Hallo, Welt!
```

## Step 5: Try Language Switching

1. Look for the 🇬🇧 flag in the top-right navbar
2. Click it and select **🇩🇪 Deutsch**
3. Watch your content translate automatically!

---

## ⚠️ Important Notes

- **Never commit `.env.local`** to Git (it's already in `.gitignore`)
- **Keep your API key secret**
- Free plan includes **500,000 characters/month**
- Translations are cached for instant loading

---

## 📚 Full Documentation

For complete details, see **[DEEPL_API_SETUP.md](./DEEPL_API_SETUP.md)**

---

## 🐛 Troubleshooting

### "API key not found"
- Make sure `.env.local` is in the project root (not in `src/`)
- Restart your dev server after creating the file
- Check the file name is exactly `.env.local` (with the dot)

### "403 Forbidden"
- Your API key might be invalid
- Check it at: https://www.deepl.com/account/summary
- Make sure you're using the **API key**, not translator account

### Still not working?
Run diagnostics:
```javascript
// Check if key is loaded
console.log(import.meta.env.VITE_DEEPL_API_KEY ? '✅ Key loaded' : '❌ Key missing');

// Check cache
console.log(localStorage.getItem('translations'));
```

---

**Need more help?** See the full setup guide in `DEEPL_API_SETUP.md`
