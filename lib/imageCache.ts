// Утилита для управления кэшем изображений
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 дней

export function cleanupOldCache() {
  try {
    const loadedImages = JSON.parse(localStorage.getItem('loadedImages') || '{}');
    const now = Date.now();
    let hasChanges = false;

    // Удаляем записи старше 30 дней
    for (const [url, timestamp] of Object.entries(loadedImages)) {
      if (typeof timestamp === 'number' && now - timestamp > CACHE_DURATION) {
        delete loadedImages[url];
        hasChanges = true;
      }
    }

    if (hasChanges) {
      localStorage.setItem('loadedImages', JSON.stringify(loadedImages));
      console.log('Старый кэш изображений очищен');
    }
  } catch (error) {
    console.error('Ошибка при очистке кэша:', error);
  }
}

export function isImageCached(url: string): boolean {
  try {
    const loadedImages = JSON.parse(localStorage.getItem('loadedImages') || '{}');
    const timestamp = loadedImages[url];
    
    if (!timestamp) return false;
    
    const now = Date.now();
    return (now - timestamp) < CACHE_DURATION;
  } catch (error) {
    return false;
  }
}

export function getCacheStats() {
  try {
    const loadedImages = JSON.parse(localStorage.getItem('loadedImages') || '{}');
    const now = Date.now();
    let total = 0;
    let valid = 0;

    for (const timestamp of Object.values(loadedImages)) {
      total++;
      if (typeof timestamp === 'number' && (now - timestamp) < CACHE_DURATION) {
        valid++;
      }
    }

    return { total, valid, expired: total - valid };
  } catch (error) {
    return { total: 0, valid: 0, expired: 0 };
  }
}
