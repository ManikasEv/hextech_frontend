/**
 * Batch Translation Utility
 * Collects all texts and translates them in one API call
 */

import axios from 'axios';

class BatchTranslator {
  constructor() {
    this.queue = new Map(); // text -> Promise
    this.timer = null;
    this.batchDelay = 100; // Wait 100ms to collect all texts
  }

  async translate(texts, targetLang, apiKey) {
    if (!texts || texts.length === 0) return [];
    if (targetLang === 'en') return texts;

    try {
      const response = await axios.post(
        '/api/deepl/v2/translate',
        {
          text: texts,
          target_lang: targetLang.toUpperCase()
        },
        {
          headers: {
            'Authorization': `DeepL-Auth-Key ${apiKey}`,
            'Content-Type': 'application/json'
          },
        }
      );

      return response.data.translations.map(t => t.text);
    } catch (error) {
      console.error('Batch translation error:', error.response?.data || error.message);
      if (error.response?.status === 429) {
        console.error('Rate limit exceeded. Please wait before translating more.');
      }
      // Return original texts on error
      return texts;
    }
  }

  addToQueue(text, targetLang, apiKey, translations, setTranslations) {
    const cacheKey = `${text}_${targetLang}`;
    
    // Check cache first
    if (translations[cacheKey]) {
      return Promise.resolve(translations[cacheKey]);
    }

    // If already in queue, return existing promise
    if (this.pendingPromises && this.pendingPromises.has(cacheKey)) {
      return this.pendingPromises.get(cacheKey);
    }

    // Initialize pending promises map if needed
    if (!this.pendingPromises) {
      this.pendingPromises = new Map();
    }

    // Create new promise for this text
    const promise = new Promise((resolve) => {
      // Store resolver in queue
      this.queue.set(cacheKey, { text, resolve, targetLang, apiKey });
    });

    // Store promise for deduplication
    this.pendingPromises.set(cacheKey, promise);

    // Set timer to process batch
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.processBatch(translations, setTranslations);
    }, this.batchDelay);

    return promise;
  }

  async processBatch(translations, setTranslations) {
    if (this.queue.size === 0) return;

    // Group by language and API key
    const batches = new Map();
    
    for (const [cacheKey, data] of this.queue.entries()) {
      const batchKey = `${data.targetLang}_${data.apiKey}`;
      if (!batches.has(batchKey)) {
        batches.set(batchKey, []);
      }
      batches.get(batchKey).push({ cacheKey, ...data });
    }

    // Process each batch
    for (const [batchKey, items] of batches.entries()) {
      const { targetLang, apiKey } = items[0];
      const texts = items.map(item => item.text);

      try {
        const translatedTexts = await this.translate(texts, targetLang, apiKey);
        
        // Cache all translations
        const newTranslations = {};
        items.forEach((item, index) => {
          const translatedText = translatedTexts[index] || item.text;
          newTranslations[item.cacheKey] = translatedText;
          item.resolve(translatedText);
        });

        // Update cache
        setTranslations(prev => ({
          ...prev,
          ...newTranslations
        }));

      } catch (error) {
        // Resolve with original text on error
        items.forEach(item => {
          item.resolve(item.text);
        });
      }
    }

    // Clear queue and pending promises
    this.queue.clear();
    if (this.pendingPromises) {
      this.pendingPromises.clear();
    }
  }
}

export const batchTranslator = new BatchTranslator();
