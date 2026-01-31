import { createContext, useContext, useState, useEffect } from 'react';
import { batchTranslationManager } from '../utils/translationQueue';

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
      // Use batch translation manager for instant results
      const translatedText = await batchTranslationManager.translate(text, targetLang);
      
      // Cache the translation
      setTranslations(prev => ({
        ...prev,
        [cacheKey]: translatedText
      }));

      return translatedText;
    } catch (error) {
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

