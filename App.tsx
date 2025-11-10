import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { HomePage } from './components/HomePage';
import { AttractionsPage } from './components/AttractionsPage';
import { MenuPage } from './components/MenuPage';
import { ShopPage } from './components/ShopPage';
import { AlcoholPage } from './components/AlcoholPage';
import { AboutPage } from './components/AboutPage';
import { AdminPage } from './components/AdminPage';
import { useTelegramWebApp, useBackButton, useHapticFeedback } from './lib/telegram';
import { useScreenshotProtection } from './lib/screenshot-protection';

export type Page = 'home' | 'attractions' | 'menu' | 'shop' | 'alcohol' | 'about' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { webApp, colorScheme, isTelegram } = useTelegramWebApp();
  const haptic = useHapticFeedback();
  const { showWarning } = useScreenshotProtection();

  // Показываем кнопку "Назад" когда не на главной странице
  const shouldShowBackButton = currentPage !== 'home';

  const navigateTo = (page: Page) => {
    haptic.impactLight();
    setCurrentPage(page);
  };

  const navigateBack = () => {
    haptic.impactLight();
    setCurrentPage('home');
  };

  // Настраиваем кнопку "Назад" в Telegram
  useBackButton(shouldShowBackButton ? navigateBack : undefined);

  // Применяем тему Telegram
  useEffect(() => {
    if (webApp) {
      // Применяем цвета темы к документу
      const root = document.documentElement;
      const theme = webApp.themeParams;

      if (theme.bg_color) root.style.setProperty('--tg-theme-bg-color', theme.bg_color);
      if (theme.text_color) root.style.setProperty('--tg-theme-text-color', theme.text_color);
      if (theme.hint_color) root.style.setProperty('--tg-theme-hint-color', theme.hint_color);
      if (theme.link_color) root.style.setProperty('--tg-theme-link-color', theme.link_color);
      if (theme.button_color) root.style.setProperty('--tg-theme-button-color', theme.button_color);
      if (theme.button_text_color)
        root.style.setProperty('--tg-theme-button-text-color', theme.button_text_color);
      if (theme.secondary_bg_color)
        root.style.setProperty('--tg-theme-secondary-bg-color', theme.secondary_bg_color);

      // Добавляем класс для темной темы
      if (colorScheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [webApp, colorScheme]);

  // Определяем фоновый цвет в зависимости от того, в Telegram ли мы
  const bgColor = isTelegram ? 'bg-[var(--tg-theme-bg-color)]' : 'bg-[#f5f5f5]';

  const containerBg = isTelegram ? 'bg-[var(--tg-theme-bg-color)]' : 'bg-white';

  return (
    <div className={`min-h-screen ${bgColor} screenshot-protection`}>
      <div className={`mx-auto max-w-[480px] ${containerBg} min-h-screen`}>
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'attractions' && <AttractionsPage onBack={navigateBack} />}
        {currentPage === 'menu' && <MenuPage onBack={navigateBack} />}
        {currentPage === 'shop' && <ShopPage onNavigate={navigateTo} onBack={navigateBack} />}
        {currentPage === 'alcohol' && <AlcoholPage onBack={() => setCurrentPage('shop')} />}
        {currentPage === 'about' && <AboutPage onBack={navigateBack} />}
        {currentPage === 'admin' && <AdminPage onBack={navigateBack} />}
      </div>
      <Toaster position="bottom-center" />

      {/* Предупреждение о скриншотах */}
      {showWarning && (
        <div className="screenshot-warning visible">
          <div>
            <div className="text-2xl mb-2">📸</div>
            <div className="font-bold mb-2">Внимание!</div>
            <div>Скриншоты запрещены</div>
            <div className="text-sm mt-2 opacity-80">Это приложение защищено от копирования</div>
          </div>
        </div>
      )}
    </div>
  );
}
