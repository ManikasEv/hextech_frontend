import { useEffect, useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Translation component that automatically translates text
 * Usage: <T>Your text here</T>
 */
const T = ({ children }) => {
  const { language, translateText, t } = useTranslation();
  const [translatedText, setTranslatedText] = useState(children);

  useEffect(() => {
    let isMounted = true;

    const performTranslation = async () => {
      // Return original text if not a string
      if (!children || typeof children !== 'string') {
        if (isMounted) setTranslatedText(children);
        return;
      }

      // Return original for English
      if (language === 'en') {
        if (isMounted) setTranslatedText(children);
        return;
      }

      // Check cache first
      const cached = t(children);
      if (cached !== children) {
        if (isMounted) setTranslatedText(cached);
        return;
      }

      // If not cached, trigger translation
      try {
        const translated = await translateText(children, language);
        if (isMounted && typeof translated === 'string') {
          setTranslatedText(translated);
        }
      } catch (error) {
        if (isMounted) {
          setTranslatedText(children);
        }
      }
    };

    performTranslation();

    return () => {
      isMounted = false;
    };
  }, [children, language, translateText, t]);

  return translatedText;
};

export default T;

