import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Lock, AlertCircle, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// v=2 — обновлено 2026-06-07, сброс кэша браузера
const CACHE_BUST = 'v=2';

interface AlcoholPageProps {
  onBack: () => void;
}

export function AlcoholPage({ onBack }: AlcoholPageProps) {
  const [promoCode, setPromoCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);

  // Закрытие по Escape
  useEffect(() => {
    if (!previewImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewImage(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [previewImage]);

  // Secret code from build-time env variable, default "ХОРОМЫ"
  const SECRET_CODE = import.meta.env.VITE_SECRET_CODE || 'ХОРОМЫ';

  const alcoholItems = [
    {
      id: 'a1',
      name: 'Самогон на бруснике',
      price: 600,
      volume: '500 мл',
      image: `/photo/alco/brusnika.png?${CACHE_BUST}`,
    },
    {
      id: 'a2',
      name: 'Cамогон в разлив',
      price: 350,
      volume: '500 мл',
      image: `/photo/alco/vishnya.png?${CACHE_BUST}`,
    },
    {
      id: 'a3',
      name: 'Самогон на дубе',
      price: 600,
      volume: '500 мл',
      image: `/photo/alco/samogon-dub.png?${CACHE_BUST}`,
    },
    {
      id: 'a4',
      name: 'Самогон на смородине',
      price: 600,
      volume: '500 мл',
      image: `/photo/alco/smorodina.png?${CACHE_BUST}`,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setError('');
    if (promoCode.toUpperCase() === SECRET_CODE.toUpperCase()) {
      setIsUnlocked(true);
    } else {
      setError('Промокод недействителен. Спросите код у администратора.');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-white overflow-y-auto">
        <Header title="Назад" onBack={onBack} />

        <div className="px-4 py-8">
          <div className="max-w-md mx-auto">
            {/* Lock Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#0088cc]/8 rounded-2xl flex items-center justify-center">
                <Lock size={40} className="text-[#0088cc]" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-[20px] font-light tracking-tight text-center mb-2 text-[#000000]">
              Введите промокод
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Введите промокод"
                  className="w-full h-12 px-4 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl text-[16px] focus:outline-none focus:border-[#0088cc]/60 focus:ring-2 focus:ring-[#0088cc]/20 transition-all duration-200 [@supportsnot(backdrop-filter:blur(1px))]:bg-white/90"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-[#e6406c]/8 backdrop-blur-xl border border-[#e6406c]/20 rounded-xl">
                  <AlertCircle size={20} className="text-[#e6406c] flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] text-[#e6406c]">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full h-12 bg-[#0088cc] text-white rounded-lg font-semibold hover:bg-[#0077b3] transition-all"
              >
                Ввести
              </button>
            </form>

            {/* Hint removed as requested */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <Header title="Назад" onBack={onBack} />

      <div className="px-4 py-6">
        {/* Success Message */}
        <div className="mb-6 p-4 bg-[#52a547]/8 backdrop-blur-xl border border-[#52a547]/20 rounded-xl">
          <p className="text-[14px] text-[#52a547] text-center font-semibold">Доступ разрешен</p>
        </div>

        {/* Alcohol Items */}
        <div className="grid grid-cols-2 gap-3">
          {alcoholItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setPreviewImage({ src: item.image, alt: item.name })}
              className="bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 overflow-hidden shadow-elevation-1 cursor-pointer active:scale-[0.97] transition-all duration-200 hover:shadow-elevation-2 [@supportsnot(backdrop-filter:blur(1px))]:bg-white/90"
            >
              <div className="aspect-square bg-[#f5f5f5] relative">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-[14px] font-medium mb-1 text-[#000000] line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-[12px] text-[#666666] mb-2">{item.volume}</p>
                <p className="text-[16px] text-[#0088cc] font-semibold">{item.price} ₽</p>
              </div>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="mt-6 p-4 bg-[#faa61a]/8 backdrop-blur-xl border border-[#faa61a]/20 rounded-xl">
          <p className="text-[14px] text-[#666666] text-center">
            Продажа алкогольной продукции лицам младше 18 лет запрещена
          </p>
        </div>

        {/* Info Text */}
        <div className="mt-4 p-4 bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 [@supportsnot(backdrop-filter:blur(1px))]:bg-white/90">
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
