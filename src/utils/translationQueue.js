/**
 * Batch Translation Manager using DeepL API.
 * Individual <T> components batch within a 60ms window.
 * changeLanguage() uses sendDirect() to bypass the delay entirely.
 */

const API_URL = '/api/deepl/v2/translate';
const MAX_PER_REQUEST = 40; // DeepL free API safe limit

async function sendChunk(texts, targetLang) {
    const apiKey = import.meta.env.VITE_DEEPL_API_KEY;
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `DeepL-Auth-Key ${apiKey}`,
        },
        body: JSON.stringify({
            text: texts,
            target_lang: targetLang.toUpperCase(),
            source_lang: 'EN',
            preserve_formatting: true,
        }),
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`DeepL ${res.status}: ${err}`);
    }
    const data = await res.json();
    return data.translations.map(t => t.text);
}

/**
 * Translate an array of strings in bulk — used by changeLanguage().
 * Splits into chunks of MAX_PER_REQUEST and awaits each chunk sequentially
 * to stay within API limits. Returns array of translated strings in same order.
 */
export async function translateBulk(texts, targetLang) {
    if (!texts.length) return [];
    const results = [];
    for (let i = 0; i < texts.length; i += MAX_PER_REQUEST) {
        const chunk = texts.slice(i, i + MAX_PER_REQUEST);
        try {
            const translated = await sendChunk(chunk, targetLang);
            results.push(...translated);
        } catch (err) {
            console.error('[DeepL] bulk chunk error:', err);
            // Fall back to original text for this chunk
            results.push(...chunk);
        }
    }
    return results;
}

class BatchTranslationManager {
    constructor() {
        this.pending = new Map(); // cacheKey -> { text, targetLang, callbacks[] }
        this.timer = null;
        this.delay = 60; // ms window to collect requests
    }

    translate(text, targetLang) {
        if (!text || typeof text !== 'string') return Promise.resolve(text);
        if (targetLang === 'en') return Promise.resolve(text);

        const key = `${text}__${targetLang}`;
        return new Promise((resolve, reject) => {
            if (!this.pending.has(key)) {
                this.pending.set(key, { text, targetLang, callbacks: [] });
            }
            this.pending.get(key).callbacks.push({ resolve, reject });
            this._schedule();
        });
    }

    _schedule() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this._flush(), this.delay);
    }

    async _flush() {
        if (!this.pending.size) return;
        const batch = Array.from(this.pending.values());
        this.pending.clear();

        // Group by language
        const byLang = {};
        batch.forEach(item => {
            (byLang[item.targetLang] = byLang[item.targetLang] || []).push(item);
        });

        await Promise.all(
            Object.entries(byLang).map(([lang, items]) => this._flushLang(lang, items))
        );
    }

    async _flushLang(targetLang, items) {
        for (let i = 0; i < items.length; i += MAX_PER_REQUEST) {
            const chunk = items.slice(i, i + MAX_PER_REQUEST);
            try {
                const translated = await sendChunk(chunk.map(c => c.text), targetLang);
                chunk.forEach((item, j) => {
                    item.callbacks.forEach(({ resolve }) => resolve(translated[j] ?? item.text));
                });
            } catch (err) {
                console.error('[DeepL] batch error:', err);
                chunk.forEach(item => {
                    item.callbacks.forEach(({ resolve }) => resolve(item.text));
                });
            }
        }
    }
}

export const batchTranslationManager = new BatchTranslationManager();
