import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Lock, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Page } from '../App';

// v=2 — обновлено 2026-06-07, сброс кэша браузера
const CACHE_BUST = 'v=2';

interface ShopPageProps {
  onNavigate: (page: Page) => void;
  onBack: () => void;
}

export function ShopPage({ onNavigate, onBack }: ShopPageProps) {
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!previewImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewImage(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [previewImage]);

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
          <div className="bg-gradient-to-r from-[#0088cc]/8 to-[#52a547]/8 backdrop-blur-xl rounded-xl p-6 border border-white/40 shadow-elevation-1">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#0088cc]/12 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock size={24} className="text-[#0088cc]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] font-medium mb-2 text-[#000000]">
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
          <h2 className="text-[18px] font-light tracking-tight mb-4 text-[#000000]">Сувениры</h2>
          <div className="grid grid-cols-2 gap-3">
            {souvenirs.map((souvenir) => (
              <div
                key={souvenir.id}
                onClick={() => setPreviewImage({ src: souvenir.image, alt: souvenir.name })}
                className="bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 overflow-hidden shadow-elevation-1 cursor-pointer active:scale-[0.97] transition-all duration-200 hover:shadow-elevation-2 [@supportsnot(backdrop-filter:blur(1px))]:bg-white/90"
              >
                <div className="aspect-square bg-[#f5f5f5] relative">
                  <ImageWithFallback
                    src={souvenir.image}
                    alt={souvenir.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-[14px] font-medium mb-2 text-[#000000] line-clamp-2">
                    {souvenir.name}
                  </h3>
                  <p className="text-[16px] text-[#0088cc] font-semibold">{souvenir.price} ₽</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Text */}
        <div className="mt-6 p-4 bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 [@supportsnot(backdrop-filter:blur(1px))]:bg-white/90">
          <p className="text-[14px] text-[#666666] text-center">
            Все товары можно приобрести обратившись к хозяину дома
          </p>
        </div>
      </div>

      {/* Fullscreen Image Preview */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors z-10"
            aria-label="Закрыть"
          >
            <X size={24} />
          </button>
          <img
            src={previewImage.src}
            alt={previewImage.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
