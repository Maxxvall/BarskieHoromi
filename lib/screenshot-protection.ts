// Хук для защиты от скриншотов
import { useEffect, useState, useCallback } from 'react';

export const useScreenshotProtection = () => {
  const [showWarning, setShowWarning] = useState(false);

  const triggerWarning = useCallback(() => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000);
  }, []);

  useEffect(() => {
    let warningTimeout: NodeJS.Timeout | undefined;

    // Детекция потери фокуса (работает на всех устройствах)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerWarning();
      }
    };

    // Детекция изменения размера viewport (работает на мобильных)
    const handleResize = () => {
      triggerWarning();
    };

    // Детекция изменения ориентации (мобильные устройства)
    const handleOrientationChange = () => {
      triggerWarning();
    };

    // Детекция blur/focus событий
    const handleBlur = () => {
      triggerWarning();
    };

    const handleFocus = () => {
      setShowWarning(false);
      if (warningTimeout) {
        clearTimeout(warningTimeout);
      }
    };

    // Детекция клавиш на десктопе
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'PrintScreen' ||
        (event.ctrlKey && event.key === 'p') ||
        (event.ctrlKey && event.shiftKey && event.key === 's')
      ) {
        event.preventDefault();
        triggerWarning();
      }
    };

    // Детекция изменения device orientation (экспериментально для мобильных)
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      // Большое изменение ориентации может указывать на скриншот
      if (event.beta && Math.abs(event.beta) > 45) {
        triggerWarning();
      }
    };

    // Детекция касаний (много касаний могут быть попыткой скриншота)
    let touchStartTime = 0;
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        touchStartTime = Date.now();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (event.touches.length === 0 && touchStartTime > 0) {
        const touchDuration = Date.now() - touchStartTime;
        if (touchDuration < 200) {
          // Быстрое касание
          triggerWarning();
        }
        touchStartTime = 0;
      }
    };

    // Добавляем обработчики событий
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('keydown', handleKeyDown);

    // Device Orientation API (если поддерживается)
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    // Touch events для мобильных
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    // Предотвращаем контекстное меню
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      triggerWarning();
    };

    // Предотвращаем drag изображений
    const handleDragStart = (event: DragEvent) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('keydown', handleKeyDown);

      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }

      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      if (warningTimeout) {
        clearTimeout(warningTimeout);
      }
    };
  }, [triggerWarning]);

  return { showWarning };
};
