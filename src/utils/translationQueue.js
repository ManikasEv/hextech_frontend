/**
 * Batch Translation Manager - Collects texts and translates them all at once
 * Provides instant translation by batching requests
 */

import axios from 'axios';

class BatchTranslationManager {
  constructor() {
    this.pendingTexts = new Map(); // text -> {resolve, reject}
    this.batchTimeout = null;
    this.batchDelay = 50; // Wait 50ms to collect texts before sending
  }

  /**
   * Request translation for a single text
   * Returns a promise that resolves when the batch completes
   */
  async translate(text, targetLang) {
    const cacheKey = `${text}_${targetLang}`;
    
    return new Promise((resolve, reject) => {
      // Add to pending batch
      if (!this.pendingTexts.has(cacheKey)) {
        this.pendingTexts.set(cacheKey, { text, targetLang, callbacks: [] });
      }
      
      this.pendingTexts.get(cacheKey).callbacks.push({ resolve, reject });
      
      // Schedule batch processing
      this.scheduleBatch();
    });
  }

  /**
   * Schedule a batch to be processed after a short delay
   * This allows multiple requests to accumulate
   */
  scheduleBatch() {
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
    }
    
    this.batchTimeout = setTimeout(() => {
      this.processBatch();
    }, this.batchDelay);
  }

  /**
   * Process all pending translations in a single API call
   */
  async processBatch() {
    if (this.pendingTexts.size === 0) return;

    // Get all pending requests
    const batch = Array.from(this.pendingTexts.values());
    const texts = batch.map(item => item.text);
    const targetLang = batch[0].targetLang; // Assume all same language

    try {
      // Send batch request to DeepL API
      const response = await axios.post(
        '/api/deepl/v2/translate',
        {
          text: texts,
          target_lang: targetLang.toUpperCase()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      const translations = response.data.translations;

      // Resolve all promises with their translations
      batch.forEach((item, index) => {
        const translatedText = translations[index]?.text || item.text;
        item.callbacks.forEach(({ resolve }) => {
          resolve(translatedText);
        });
      });

    } catch (error) {
      // Reject all promises
      batch.forEach((item) => {
        item.callbacks.forEach(({ reject }) => {
          reject(error);
        });
      });
    }

    // Clear the batch
    this.pendingTexts.clear();
  }
}

export const batchTranslationManager = new BatchTranslationManager();
