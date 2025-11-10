import { Header } from './Header';
import { Phone, Send } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
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
          <h2 className="text-[17px] font-semibold mb-4 text-[#000000]">Добро пожаловать</h2>
          <div className="space-y-4 text-[16px] text-[#000000] leading-relaxed">
            <p>
              Гостевой дом «Барские Хоромы» расположен в центре города Беломорск. На первом этаже
              располагается просторный зал с камином, телевизором 65 дюймов со Smаrt ТV, с
              возможностью подключения телефона по Wi-Fi ,обеденный стол, зерновая кофемашина,
              уютная кухня оборудована всей необходимой техникой и кухонными принадлежностями,
              санузел, душевая с кедровой бочкой ( за отдельную плату). Сердцем дома является
              большой камин, который расположен в центре гостиной и создаёт невероятную атмосферу
              комфорта и уюта. Коттедж расположен в тихом месте без посторонних глаз и лишнего шума.
              Собственная парковка. На всей территории гостевого дома действует бесплатный Wi-Fi.
              Магазины находятся в шаговой доступности.
            </p>
            <p>
              Для гостей сервируется завтрак и ужин по меню. Меню и стоимость обговаривается
              отдельно.
            </p>
            <p>
              Сдаётся не дом целиком , а просторные гостевые комнаты , которые расположены на втором
              этаже. В каждой комнате может расположиться до 4 человек. В одном номере находится 2
              двухспальных дивана с ортопедическими матрасами, во втором номере двухспальная кровать
              с ортопедическим матрасом и диван . Санузел с душевой кабинкой, раковиной, унитазом и
              теплым полом расположен на этаже на две комнаты. На этаже находиться бильярд. С
              террасы дома открывается прекрасный вид на реку, церковь.
            </p>
            <p>
              Заезд после 14:00 (при возможности время регулируется)
              <br />
              Выезд до 12:00 (при возможности время регулируется)
            </p>
            <p>
              Курение и размещение с животными в доме запрещено.
              <br />
              Возможен заказ трансфера за дополнительную плату .
            </p>
            <p>
              В стоимость входит:
              <br />
              -все необходимое для приготовления еды, чай, кофе,
              <br />
              -зона барбекю,
              <br />
              -принадлежности для барбекю (мангал, решетка, шампуры),
              <br />
              -постельное белье,
              <br />
              -ванная: полотенца, шампунь, гель для душа, фен.
              <br />
              -автостоянка.
              <br />
              При необходимости дополнительного белья - доплата 1000 рублей.
            </p>
            <p>
              В окрестностях можно заняться такими видами активного отдыха, как пешие походы,
              сноркелинг и рыбная ловля.
            </p>
            <p>
              Отдохните от городской суеты в нашем уютном шале и насладитесь чудесными пейзажами
              карельской природы!
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-[17px] font-semibold mb-4 text-[#000000]">Контакты</h2>
          <div className="space-y-3">
            {/* Telegram */}
            <a
              href="https://t.me/guesthouse"
              className="flex items-center gap-4 p-4 bg-[#0088cc]/10 rounded-lg border border-[#0088cc]/20 hover:bg-[#0088cc]/20 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#0088cc] rounded-full text-white">
                <Send size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-[#666666] mb-1">Telegram</p>
                <p className="text-[16px] font-semibold text-[#0088cc]">@guesthouse</p>
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

        {/* Additional Info */}
        <div className="p-4 bg-[#f5f5f5] rounded-lg">
          <p className="text-[14px] text-[#666666] text-center mb-2">Режим работы администрации</p>
          <p className="text-[16px] text-[#000000] text-center font-semibold">
            Ежедневно с 8:00 до 22:00
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <a
            href="https://t.me/firemannn3"
            className="block w-full py-4 bg-[#0088cc] text-white text-center rounded-lg font-semibold hover:bg-[#0077b3] transition-all"
          >
            Написать администратору
          </a>
        </div>
      </div>
    </div>
  );
}
