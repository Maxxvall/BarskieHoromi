import { useEffect, useState, useCallback } from 'react';

/**
 * Telegram WebApp интерфейс
 */
export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: any;
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  BackButton: any;
  MainButton: any;
  HapticFeedback: any;
  ready(): void;
  expand(): void;
  close(): void;
  showPopup(params: any, callback?: (buttonId: string) => void): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  sendData(data: string): void;
}

/**
 * Получить экземпляр Telegram WebApp
 */
export const getTelegramWebApp = (): TelegramWebApp | null => {
  if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
    return (window as any).Telegram.WebApp;
  }
  return null;
};

/**
 * Проверить, запущено ли приложение в Telegram
 */
export const isTelegramWebApp = (): boolean => {
  return getTelegramWebApp() !== null;
};

/**
 * Хук для работы с Telegram WebApp
 */
export const useTelegramWebApp = () => {
  const [webApp] = useState<TelegramWebApp | null>(() => getTelegramWebApp());
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(() => {
    const app = getTelegramWebApp();
    return app?.colorScheme || 'light';
  });
  const [isExpanded, setIsExpanded] = useState(() => {
    const app = getTelegramWebApp();
    return app?.isExpanded || false;
  });

  useEffect(() => {
    if (!webApp) return;

    // Подписываемся на изменения темы
    const handleThemeChange = () => {
      setColorScheme(webApp.colorScheme);
    };

    const handleViewportChange = () => {
      setIsExpanded(webApp.isExpanded);
    };

    // Telegram WebApp не имеет встроенных событий, но мы можем проверять изменения
    const interval = setInterval(() => {
      if (webApp.colorScheme !== colorScheme) {
        handleThemeChange();
      }
      if (webApp.isExpanded !== isExpanded) {
        handleViewportChange();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [webApp, colorScheme, isExpanded]);

  return {
    webApp,
    colorScheme,
    isExpanded,
    isTelegram: webApp !== null,
  };
};

/**
 * Хук для работы с кнопкой "Назад"
 */
export const useBackButton = (onClick?: () => void) => {
  const webApp = getTelegramWebApp();

  useEffect(() => {
    if (webApp && onClick) {
      webApp.BackButton.onClick(onClick);
      webApp.BackButton.show();

      return () => {
        webApp.BackButton.offClick(onClick);
        webApp.BackButton.hide();
      };
    }
  }, [webApp, onClick]);

  return {
    show: () => webApp?.BackButton.show(),
    hide: () => webApp?.BackButton.hide(),
  };
};

/**
 * Хук для работы с главной кнопкой
 */
export const useMainButton = (text: string, onClick?: () => void) => {
  const webApp = getTelegramWebApp();

  useEffect(() => {
    if (webApp && onClick) {
      webApp.MainButton.setText(text);
      webApp.MainButton.onClick(onClick);
      webApp.MainButton.show();

      return () => {
        webApp.MainButton.offClick(onClick);
        webApp.MainButton.hide();
      };
    }
  }, [webApp, text, onClick]);

  return {
    show: () => webApp?.MainButton.show(),
    hide: () => webApp?.MainButton.hide(),
    enable: () => webApp?.MainButton.enable(),
    disable: () => webApp?.MainButton.disable(),
    showProgress: () => webApp?.MainButton.showProgress(),
    hideProgress: () => webApp?.MainButton.hideProgress(),
    setText: (newText: string) => webApp?.MainButton.setText(newText),
  };
};

/**
 * Хук для работы с тактильной обратной связью
 */
export const useHapticFeedback = () => {
  const webApp = getTelegramWebApp();

  return {
    impactLight: useCallback(() => webApp?.HapticFeedback.impactOccurred('light'), [webApp]),
    impactMedium: useCallback(() => webApp?.HapticFeedback.impactOccurred('medium'), [webApp]),
    impactHeavy: useCallback(() => webApp?.HapticFeedback.impactOccurred('heavy'), [webApp]),
    notificationSuccess: useCallback(
      () => webApp?.HapticFeedback.notificationOccurred('success'),
      [webApp]
    ),
    notificationError: useCallback(
      () => webApp?.HapticFeedback.notificationOccurred('error'),
      [webApp]
    ),
    notificationWarning: useCallback(
      () => webApp?.HapticFeedback.notificationOccurred('warning'),
      [webApp]
    ),
    selectionChanged: useCallback(() => webApp?.HapticFeedback.selectionChanged(), [webApp]),
  };
};

/**
 * Показать всплывающее окно
 */
export const showPopup = (message: string, title?: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.showPopup(
        {
          title,
          message,
          buttons: [{ type: 'ok' }],
        },
        (buttonId) => resolve(buttonId)
      );
    } else {
      alert(message);
      resolve(null);
    }
  });
};

/**
 * Показать подтверждение
 */
export const showConfirm = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.showConfirm(message, (confirmed) => resolve(confirmed));
    } else {
      resolve(confirm(message));
    }
  });
};

/**
 * Открыть ссылку
 */
export const openLink = (url: string, tryInstantView = false) => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.openLink(url, { try_instant_view: tryInstantView });
  } else {
    window.open(url, '_blank');
  }
};

/**
 * Закрыть Mini App
 */
export const closeApp = () => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.close();
  }
};

/**
 * Отправить данные боту
 */
export const sendData = (data: string | object) => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    const dataString = typeof data === 'string' ? data : JSON.stringify(data);
    webApp.sendData(dataString);
  }
};
