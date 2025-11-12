import { MapPin, UtensilsCrossed, ShoppingBag, Info, Shield, Send, Phone } from 'lucide-react';
import { Page } from '../App';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { getTelegramUserData } from '../lib/telegram-api';
import { useTelegramWebApp } from '../lib/telegram';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const userData = getTelegramUserData();
  const { webApp } = useTelegramWebApp();
  const isAdmin = userData?.id === 515650034 || userData?.id === 5216793564;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0088cc] text-white px-6 py-8">
        <h1 className="text-[20px] font-semibold mb-2">Гостевой дом</h1>
        <p className="text-[14px] opacity-90">Добро пожаловать!</p>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-6 bg-white">
        <div className="grid gap-4">
          <NavigationButton
            icon={<MapPin size={32} />}
            title="Достопримечательности"
            description="Места для посещения"
            onClick={() => onNavigate('attractions')}
            delay={0}
          />
          <NavigationButton
            icon={<UtensilsCrossed size={32} />}
            title="Меню"
            description="Заказать завтрак или ужин"
            onClick={() => onNavigate('menu')}
            delay={0.1}
          />
          <NavigationButton
            icon={<ShoppingBag size={32} />}
            title="Магазин"
            description="Сувениры и товары"
            onClick={() => onNavigate('shop')}
            delay={0.2}
          />
          <NavigationButton
            icon={<Info size={32} />}
            title="О нас"
            description="Информация о гостевом доме"
            onClick={() => onNavigate('about')}
            delay={0.3}
          />
          {isAdmin && (
            <NavigationButton
              icon={<Shield size={32} />}
              title="Админ панель"
              description="Управление контентом"
              onClick={() => onNavigate('admin')}
              delay={0.4}
            />
          )}
        </div>
      </div>

      {/* Contact Footer */}
      <div className="px-6 py-4 bg-[#f5f5f5] border-t border-[#e9e9e9]">
        <p className="text-[14px] text-[#666666] mb-2">Связаться с нами:</p>
        <div className="flex flex-col gap-1">
          <a
            onClick={() => webApp?.openTelegramLink('tg://user?id=5216793564')}
            className="text-[16px] text-[#0088cc] cursor-pointer flex items-center gap-2"
          >
            <Send size={16} />
            Сергей
          </a>
          <a href="tel:+79212265444" className="text-[16px] text-[#0088cc] flex items-center gap-2">
            <Phone size={16} />
            +7 (921) 226-54-44
          </a>
        </div>
      </div>
    </div>
  );
}

interface NavigationButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  delay: number;
}

function NavigationButton({ icon, title, description, onClick, delay }: NavigationButtonProps) {
  return (
    <Card
      className="cursor-pointer hover:border-[#0088cc] transition-all duration-200 hover:shadow-md opacity-0 animate-fade-in-up"
      onClick={onClick}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Используем flex для выравнивания иконки и текстов в одну строку */}
      <CardHeader className="flex items-center gap-4 p-4">
        <div className="flex items-center justify-center w-16 h-16 bg-[#0088cc]/10 rounded-lg text-[#0088cc] shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <CardTitle className="text-[16px] font-semibold mb-1">{title}</CardTitle>
          <CardDescription className="text-[14px]">{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
