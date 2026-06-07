import { useState, useCallback } from 'react';
import { Header } from './Header';
import { Phone, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { openMaxLink } from '../lib/telegram';

interface AboutPageProps {
  onBack: () => void;
}

const photos = [
  { url: '/onas/2.jpg', alt: 'Внешний вид гостевого дома' },
  { url: '/onas/orig.jpeg', alt: 'Гостевой дом «Барские Хоромы»' },
  { url: '/onas/i.webp', alt: 'Интерьер гостевого дома' },
];

export function AboutPage({ onBack }: AboutPageProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const goNext = useCallback(() => {
    setCurrentPhoto((p) => (p + 1) % photos.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentPhoto((p) => (p - 1 + photos.length) % photos.length);
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
    setIsSwiping(true);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = e.touches[0].clientX - touchStart;
    setTouchDelta(delta);
  }, [touchStart]);

  const onTouchEnd = useCallback(() => {
    if (Math.abs(touchDelta) > 50) {
      if (touchDelta < 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
    setTouchDelta(0);
    setIsSwiping(false);
  }, [touchDelta, goNext, goPrev]);

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <Header title="О нас" onBack={onBack} />

      <div className="px-4 py-6">
        {/* Photo Carousel */}
        <div className="mb-8">
          <div
            className="relative aspect-video rounded-lg overflow-hidden bg-[#f5f5f5] shadow-sm select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Only render current + adjacent images for lazy loading */}
            <div className="w-full h-full">
              {photos.map((photo, index) => {
                // Only render current and adjacent photos to avoid unnecessary network requests
                if (Math.abs(index - currentPhoto) > 1) return null;
                const offset = index - currentPhoto;
                return (
                  <div
                    key={index}
                    className="absolute inset-0 transition-transform duration-300 ease-out"
                    style={{
                      transform: `translateX(calc(${offset * 100}% + ${isSwiping && index === currentPhoto ? touchDelta : 0}px))`,
                    }}
                  >
                    <ImageWithFallback
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors z-10"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors z-10"
                  aria-label="Следующее фото"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Dots */}
            {photos.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhoto(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentPhoto
                        ? 'bg-white w-5'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Фото ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-[17px] font-semibold mb-4 text-[#000000]">Добро пожаловать! 🏡</h2>
          <div className="space-y-4 text-[16px] text-[#000000] leading-relaxed">
            <p>
              Гостевой дом «Барские Хоромы» — в самом центре Беломорска. На первом этаже — просторный зал с большим камином 🔥, 65" Smart TV (с подключением по Wi-Fi), обеденный стол и зерновая кофемашина. Уютная кухня полностью укомплектована, есть санузел и душевая с кедровой бочкой (за доп. плату). Коттедж стоит в тихом месте, есть собственная парковка и бесплатный Wi-Fi по всей территории. Магазины — в шаговой доступности.
            </p>
            <p>
              Гостям подаются завтрак и ужин по меню; меню и стоимость обсуждаются отдельно.
            </p>
            <p>
              Сдаём не дом целиком, а просторные гостевые комнаты на втором этаже — в каждой комнате до 4 человек. В одном номере — 2 двухспальных дивана с ортопедическими матрасами; в другом — двуспальная кровать и диван. Санузел с душевой кабинкой и тёплым полом — на две комнаты. На этаже есть бильярд. С террасы открывается красивый вид на реку и церковь. 🌊⛪
            </p>
            <p>
              Заезд после 14:00 (по согласованию — возможны изменения). Выезд до 12:00 (по согласованию).
            </p>
            <p>
              Курение и размещение с животными запрещены. Трансфер возможен за отдельную плату.
            </p>
            <p>
              В стоимость включено:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>всё необходимое для приготовления еды, чай и кофе 🍽️☕</li>
              <li>зона барбекю и принадлежности (мангал, решётка, шампуры) 🔥</li>
              <li>постельное бельё (при необходимости доп. комплект — +1000 ₽)</li>
              <li>полотенца, шампунь, гель для душа, фен</li>
              <li>автопарковка 🚗</li>
            </ul>
            <p>
              В окрестностях доступны пешие прогулки, сноркелинг и рыбалка — идеальное место, чтобы отдохнуть от городской суеты и насладиться карельской природой. 🌲✨
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-[17px] font-semibold mb-4 text-[#000000]">Контакты</h2>
          <div className="space-y-3">
            {/* Telegram */}
            <a
              onClick={() => openMaxLink('https://max.ru/u/f9LHodD0cOJOIUAy2QVWz08FsV6DwdlAwoEzUBR6_SoDYBpWxI8kkp76YeQ')}
              className="flex items-center gap-4 p-4 bg-[#0088cc]/10 rounded-lg border border-[#0088cc]/20 hover:bg-[#0088cc]/20 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#0088cc] rounded-full text-white">
                <Send size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-[#666666] mb-1">MAX</p>
                <p className="text-[16px] font-semibold text-[#0088cc]">Сергей</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+79212265444"
              className="flex items-center gap-4 p-4 bg-[#52a547]/10 rounded-lg border border-[#52a547]/20 hover:bg-[#52a547]/20 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#52a547] rounded-full text-white">
                <Phone size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-[#666666] mb-1">Телефон</p>
                <p className="text-[16px] font-semibold text-[#52a547]">+7 (921) 226-54-44</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
