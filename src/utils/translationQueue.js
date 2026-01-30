/**
 * Translation Queue - Throttles API calls to avoid rate limiting
 */

class TranslationQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.delay = 200; // 200ms between requests
  }

  async add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const { fn, resolve, reject } = this.queue.shift();
      
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        reject(error);
      }

      // Wait before processing next request
      if (this.queue.length > 0) {
        await new Promise(r => setTimeout(r, this.delay));
      }
    }

    this.isProcessing = false;
  }
}

export const translationQueue = new TranslationQueue();
