/**
 * Diagnostics Tool for Translation System
 * Open browser console and run: runDiagnostics()
 */

export const runDiagnostics = async () => {
  console.log('🔍 Running Translation System Diagnostics...\n');
  
  // Test 1: Check if API key is loaded
  console.log('Test 1: API Key Check');
  const apiKey = import.meta.env.VITE_DEEPL_API_KEY;
  if (apiKey) {
    console.log('✅ API key found:', apiKey.substring(0, 10) + '...');
  } else {
    console.error('❌ API key NOT found!');
    console.log('💡 Solution: Make sure .env.local file exists with VITE_DEEPL_API_KEY');
    return;
  }
  console.log('');
  
  // Test 2: Check localStorage
  console.log('Test 2: localStorage Check');
  const currentLang = localStorage.getItem('language');
  const cachedTranslations = localStorage.getItem('translations');
  console.log('Current language:', currentLang || 'Not set (will default to "en")');
  console.log('Cached translations:', cachedTranslations ? 'Found' : 'None yet');
  console.log('');
  
  // Test 3: Test API connection
  console.log('Test 3: DeepL API Connection Test');
  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: ['Hello, world!'],
        target_lang: 'DE'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Connection successful!');
      console.log('📝 Test translation:');
      console.log('   Original: "Hello, world!"');
      console.log('   Translated:', data.translations[0].text);
      console.log('   Detected source:', data.translations[0].detected_source_language);
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ API Error:', response.status, response.statusText);
      console.error('Details:', errorData);
      
      if (response.status === 403) {
        console.log('💡 API key might be invalid or expired');
        console.log('💡 Check your key at: https://www.deepl.com/account/summary');
      } else if (response.status === 456) {
        console.log('💡 Character limit reached for this month');
        console.log('💡 Check usage at: https://www.deepl.com/account/usage');
      }
    }
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    console.log('💡 Check your internet connection');
  }
  console.log('');
  
  // Test 4: Check if TranslationContext is available
  console.log('Test 4: React Context Check');
  console.log('Open React DevTools and check if TranslationProvider is wrapping your app');
  console.log('Path: <TranslationProvider> → <Router> → <Routes>');
  console.log('');
  
  console.log('🎉 Diagnostics complete!');
  console.log('');
  console.log('Next steps:');
  console.log('1. If all tests pass: Try clicking the language switcher');
  console.log('2. If API test fails: Check your API key');
  console.log('3. If nothing appears: Check browser console for errors');
  console.log('');
  console.log('Need help? Check DEEPL_API_SETUP.md');
};

// Make it available globally
if (typeof window !== 'undefined') {
  window.runDiagnostics = runDiagnostics;
}

export default runDiagnostics;
