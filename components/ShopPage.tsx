import { Header } from './Header';
import { Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Page } from '../App';

// v=2 — обновлено 2026-06-07, сброс кэша браузера
const CACHE_BUST = 'v=2';

interface ShopPageProps {
  onNavigate: (page: Page) => void;
  onBack: () => void;
}

export function ShopPage({ onNavigate, onBack }: ShopPageProps) {
  const souvenirs = [
    {
      id: 's1',
      name: 'Магнит с пейзажем Карелии',
      price: 150,
      image: `/photo/magnitik2.png?${CACHE_BUST}`,
    },
    {
      id: 's2',
      name: 'Магнит',
      price: 150,
      image: `/photo/magnitik.png?${CACHE_BUST}`,
    },
    {
      id: 's3',
      name: 'Часы на фанере',
      price: 1200,
      image: `/photo/chasy.png?${CACHE_BUST}`,
    },
    {
      id: 's4',
      name: 'Картина',
      price: 600,
      image: `/photo/platok.png?${CACHE_BUST}`,
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <Header title="Магазин" onBack={onBack} />

      <div className="px-4 py-6">
        {/* Alcohol Promo Section (always visible) */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#0088cc]/10 to-[#52a547]/10 rounded-lg p-6 border border-[#0088cc]/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#0088cc]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock size={24} className="text-[#0088cc]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] font-semibold mb-2 text-[#000000]">
                  Секретный раздел
                </h3>
                {/* Description removed as requested */}
              </div>
            </div>
            <button
              onClick={() => onNavigate('alcohol')}
              className="w-full py-3 bg-[#0088cc] text-white rounded-lg font-semibold hover:bg-[#0077b3] transition-all"
            >
              Показать
            </button>
          </div>
        </div>

        {/* Souvenirs Section */}
        <div className="mb-8">
          <h2 className="text-[17px] font-semibold mb-4 text-[#000000]">Сувениры</h2>
          <div className="grid grid-cols-2 gap-3">
            {souvenirs.map((souvenir) => (
              <div
                key={souvenir.id}
                className="bg-white rounded-lg border border-[#e9e9e9] overflow-hidden shadow-sm"
              >
                <div className="aspect-square bg-[#f5f5f5] relative">
                  <ImageWithFallback
                    src={souvenir.image}
                    alt={souvenir.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-[14px] font-semibold mb-2 text-[#000000] line-clamp-2">
                    {souvenir.name}
                  </h3>
                  <p className="text-[16px] text-[#0088cc] font-semibold">{souvenir.price} ₽</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Text */}
        <div className="mt-6 p-4 bg-[#f5f5f5] rounded-lg">
          <p className="text-[14px] text-[#666666] text-center">
            Все товары можно приобрести обратившись к хозяевам дома
          </p>
        </div>
      </div>
    </div>
  );
}
