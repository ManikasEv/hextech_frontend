import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { translationQueue } from '../utils/translationQueue';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  
  const [translations, setTranslations] = useState(() => {
    const cached = localStorage.getItem('translations');
    return cached ? JSON.parse(cached) : {};
  });

  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('translations', JSON.stringify(translations));
  }, [translations]);

  const translateText = async (text, targetLang) => {
    // Create a cache key
    const cacheKey = `${text}_${targetLang}`;
    
    // Check if translation exists in cache
    if (translations[cacheKey]) {
      return translations[cacheKey];
    }

    // If target language is English, return original text
    if (targetLang === 'en') {
      return text;
    }

    try {
      // Add to queue to throttle API calls
      const translatedText = await translationQueue.add(async () => {
        console.log('Translating:', text.substring(0, 50), '...');

        const response = await axios.post(
          '/api/deepl/v2/translate',
          {
            text: [text],
            target_lang: targetLang.toUpperCase()
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
          }
        );

        return response.data.translations[0].text;
      });
      
      console.log('✓ Translated');
      
      // Cache the translation
      setTranslations(prev => ({
        ...prev,
        [cacheKey]: translatedText
      }));

      return translatedText;
    } catch (error) {
      console.error('Translation error:', error.response?.data || error.message);
      if (error.response?.status === 429) {
        console.warn('Rate limit - returning original text');
      }
      return text;
    }
  };

  const changeLanguage = async (newLang) => {
    if (newLang === language) return;
    
    setIsTranslating(true);
    setLanguage(newLang);
    
    // Small delay to prevent rapid switching
    setTimeout(() => {
      setIsTranslating(false);
    }, 300);
  };

  const t = (text) => {
    if (language === 'en') {
      return text;
    }

    const cacheKey = `${text}_${language}`;
    return translations[cacheKey] || text;
  };

  const value = {
    language,
    changeLanguage,
    translateText,
    t,
    isTranslating
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

