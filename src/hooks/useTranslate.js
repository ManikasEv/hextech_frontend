import { useEffect, useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

export const useTranslate = (text) => {
  const { language, translateText } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performTranslation = async () => {
      if (language === 'en') {
        setTranslatedText(text);
        return;
      }

      setIsLoading(true);
      const translated = await translateText(text, language);
      setTranslatedText(translated);
      setIsLoading(false);
    };

    performTranslation();
  }, [text, language, translateText]);

  return { text: translatedText, isLoading };
};

// Hook for translating multiple texts at once
export const useTranslateMultiple = (texts) => {
  const { language, translateText } = useTranslation();
  const [translatedTexts, setTranslatedTexts] = useState(texts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performTranslations = async () => {
      if (language === 'en') {
        setTranslatedTexts(texts);
        return;
      }

      setIsLoading(true);
      const promises = texts.map(text => translateText(text, language));
      const results = await Promise.all(promises);
      setTranslatedTexts(results);
      setIsLoading(false);
    };

    performTranslations();
  }, [texts, language, translateText]);

  return { texts: translatedTexts, isLoading };
};

