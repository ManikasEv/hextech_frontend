import { useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * <T>Your text here</T>
 *
 * Reads the translation synchronously from cacheRef on every render.
 * Re-renders whenever `tick` increments (cache grew) or `language` changes.
 * Zero async flicker — if it's cached, it shows immediately.
 * Cache miss: fires translateText() once, which updates cacheRef + bumps tick.
 */
const T = ({ children }) => {
    const { language, cacheRef, tick, translateText } = useTranslation();
    const requestedRef = useRef(false);

    // Reset request flag when language or text changes
    useEffect(() => { requestedRef.current = false; }, [children, language]);

    if (!children || typeof children !== 'string' || language === 'en') return children;

    const key = `${children}__${language}`;
    const cached = cacheRef.current[key];

    if (cached) return cached;

    // Cache miss — fire one async request (guard prevents duplicate calls)
    if (!requestedRef.current) {
        requestedRef.current = true;
        translateText(children, language); // updates cacheRef + calls flushCache() → tick++
    }

    // Show original while waiting
    return children;
};

export default T;
