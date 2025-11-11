import { Header } from './Header';
import { Phone, Send } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTelegramWebApp } from '../lib/telegram';

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  const { webApp } = useTelegramWebApp();
  const photos = [
    {
      url: '/onas/2.jpg',
      alt: 'Внешний вид гостевого дома',
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <Header title="О нас" onBack={onBack} />

      <div className="px-4 py-6">
        {/* Photo Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-4">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden bg-[#f5f5f5] shadow-sm"
              >
                <ImageWithFallback
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
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
              onClick={() => webApp?.openTelegramLink('tg://user?id=5216793564')}
              className="flex items-center gap-4 p-4 bg-[#0088cc]/10 rounded-lg border border-[#0088cc]/20 hover:bg-[#0088cc]/20 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#0088cc] rounded-full text-white">
                <Send size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-[#666666] mb-1">Telegram</p>
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
