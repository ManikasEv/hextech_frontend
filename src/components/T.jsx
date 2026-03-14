import { useEffect, useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * <T>Your text here</T>
 *
 * Flow:
 * 1. Render: show cached value synchronously (no flicker).
 * 2. After changeLanguage() pre-warm, `translations` updates once →
 *    this component re-renders and picks up the cached value.
 * 3. Cache miss: calls translateText() which hits DeepL then updates state.
 */
const T = ({ children }) => {
    const { language, translations, translateText } = useTranslation();

    const getDisplay = () => {
        if (!children || typeof children !== 'string' || language === 'en') return children;
        return translations[`${children}__${language}`] || children;
    };

    const [display, setDisplay] = useState(getDisplay);

    useEffect(() => {
        if (!children || typeof children !== 'string') { setDisplay(children); return; }
        if (language === 'en') { setDisplay(children); return; }

        const cached = translations[`${children}__${language}`];
        if (cached) { setDisplay(cached); return; }

        // Cache miss — ask the API
        let cancelled = false;
        translateText(children, language).then(result => {
            if (!cancelled && typeof result === 'string') setDisplay(result);
        }).catch(() => { if (!cancelled) setDisplay(children); });

        return () => { cancelled = true; };
    // translateText is stable (no deps), safe to omit from array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, language, translations]);

    return display;
};

export default T;
