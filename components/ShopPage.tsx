import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Page } from '../App';

interface ShopPageProps {
  onNavigate: (page: Page) => void;
  onBack: () => void;
}

export function ShopPage({ onNavigate, onBack }: ShopPageProps) {
  const [isSecretSectionVisible, setIsSecretSectionVisible] = useState<boolean>(true);

  // Загрузка состояния видимости секретного раздела
  useEffect(() => {
    const loadSecretSectionVisibility = async () => {
      try {
        const response = await fetch('/api/secret-section-visibility');
        const data = await response.json();
        setIsSecretSectionVisible(data.isVisible);
      } catch (error) {
        console.error('Error loading secret section visibility:', error);
        // В случае ошибки показываем раздел по умолчанию
        setIsSecretSectionVisible(true);
      }
    };

    loadSecretSectionVisibility();
  }, []);
  const souvenirs = [
    {
      id: 's1',
      name: 'Магнит с видом гор',
      price: 150,
      image: '/photo/Магнитик2.png',
    },
    {
      id: 's2',
      name: 'Деревянная ложка',
      price: 350,
      image: '/photo/Деревяная ложка.png',
    },
    {
      id: 's3',
      name: 'Керамическая кружка',
      price: 450,
      image: '/photo/Кружка.png',
    },
    {
      id: 's4',
      name: 'Магнит с видом',
      price: 150,
      image: '/photo/магнитик.png',
    },
    {
      id: 's5',
      name: 'Часы настенные',
      price: 1200,
      image: '/photo/Часы.png',
    },
    {
      id: 's6',
      name: 'Текстильный платок',
      price: 600,
      image: '/photo/Текстильный платок.png',
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <Header title="Магазин" onBack={onBack} />

      <div className="px-4 py-6">
        {/* Alcohol Promo Section (moved above souvenirs) */}
        {isSecretSectionVisible && (
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
        )}

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
