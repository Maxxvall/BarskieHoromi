/// <reference types="vite/client" />

interface Window {
  Telegram?: {
    WebApp: {
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
      BackButton: {
        isVisible: boolean;
        onClick(callback: () => void): void;
        offClick(callback: () => void): void;
        show(): void;
        hide(): void;
      };
      MainButton: {
        text: string;
        color: string;
        textColor: string;
        isVisible: boolean;
        isActive: boolean;
        isProgressVisible: boolean;
        setText(text: string): void;
        onClick(callback: () => void): void;
        offClick(callback: () => void): void;
        show(): void;
        hide(): void;
        enable(): void;
        disable(): void;
        showProgress(leaveActive?: boolean): void;
        hideProgress(): void;
      };
      HapticFeedback: {
        impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
        notificationOccurred(type: 'error' | 'success' | 'warning'): void;
        selectionChanged(): void;
      };
      ready(): void;
      expand(): void;
      close(): void;
      showPopup(params: any, callback?: (buttonId: string) => void): void;
      showAlert(message: string, callback?: () => void): void;
      showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
      openLink(url: string, options?: { try_instant_view?: boolean }): void;
      sendData(data: string): void;
    };
  };
}
