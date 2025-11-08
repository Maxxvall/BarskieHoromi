import { MapPin, UtensilsCrossed, ShoppingBag, Info } from 'lucide-react';
import { Page } from '../App';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
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
          />
          <NavigationButton
            icon={<UtensilsCrossed size={32} />}
            title="Меню"
            description="Заказать завтрак или ужин"
            onClick={() => onNavigate('menu')}
          />
          <NavigationButton
            icon={<ShoppingBag size={32} />}
            title="Магазин"
            description="Сувениры и товары"
            onClick={() => onNavigate('shop')}
          />
          <NavigationButton
            icon={<Info size={32} />}
            title="О нас"
            description="Информация о гостевом доме"
            onClick={() => onNavigate('about')}
          />
        </div>
      </div>

      {/* Contact Footer */}
      <div className="px-6 py-4 bg-[#f5f5f5] border-t border-[#e9e9e9]">
        <p className="text-[14px] text-[#666666] mb-2">Связаться с нами:</p>
        <div className="flex flex-col gap-1">
          <a href="https://t.me/guesthouse" className="text-[16px] text-[#0088cc]">
            @guesthouse
          </a>
          <a href="tel:+79001234567" className="text-[16px] text-[#0088cc]">
            +7 (900) 123-45-67
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
}

function NavigationButton({ icon, title, description, onClick }: NavigationButtonProps) {
  return (
    <Card
      className="cursor-pointer hover:border-[#0088cc] transition-all duration-200 hover:shadow-md"
      onClick={onClick}
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
