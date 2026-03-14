/**
 * Test DeepL API Connection
 * 
 * This utility helps you verify your DeepL API key is working correctly.
 * Run this in your browser console to test the connection.
 */

export const testDeepLAPI = async (apiKey) => {
  console.log('🔍 Testing DeepL API connection...');
  
  if (!apiKey) {
    console.error('❌ No API key provided');
    console.log('💡 Usage: testDeepLAPI("your-api-key-here")');
    return;
  }

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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ API Error:', response.status, response.statusText);
      console.error('Details:', errorData);
      
      if (response.status === 403) {
        console.log('💡 Check if your API key is correct');
        console.log('💡 Visit: https://www.deepl.com/account/summary');
      }
      return;
    }

    const data = await response.json();
    console.log('✅ API Connection successful!');
    console.log('📝 Original text: "Hello, world!"');
    console.log('🌍 Translated text:', data.translations[0].text);
    console.log('🔤 Detected source language:', data.translations[0].detected_source_language);
    console.log('\n🎉 Your DeepL API is working correctly!');
    
    return data;
  } catch (error) {
    console.error('❌ Connection error:', error);
    console.log('💡 Check your internet connection');
    console.log('💡 Verify the API endpoint is accessible');
  }
};

/**
 * Quick test using environment variable
 */
export const quickTest = async () => {
  const apiKey = import.meta.env.VITE_DEEPL_API_KEY;
  
  if (!apiKey) {
    console.error('❌ VITE_DEEPL_API_KEY not found in environment variables');
    console.log('💡 Create a .env.local file with: VITE_DEEPL_API_KEY=your-key-here');
    console.log('💡 Then restart your dev server');
    return;
  }

  console.log('✅ API key found in environment');
  await testDeepLAPI(apiKey);
};

// Make it available globally for browser console testing
if (typeof window !== 'undefined') {
  window.testDeepLAPI = testDeepLAPI;
  window.quickTest = quickTest;
}

export default testDeepLAPI;
