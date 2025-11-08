import { Header } from './Header';
import { Phone, Send } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1605972013598-be8367a96e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWVzdGhvdXNlJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzYyNTQ3MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Внешний вид гостевого дома',
    },
    {
      url: 'https://images.unsplash.com/photo-1737737210863-387afd35344e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaW50ZXJpb3IlMjByb29tfGVufDF8fHx8MTc2MjU0NzA4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Уютный интерьер номера',
    },
    {
      url: 'https://images.unsplash.com/photo-1606920301459-d66500c43ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYyNTQ3MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Общая зона отдыха',
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <Header title="О нас" onBack={onBack} />
      
      <div className="px-4 py-6">
        {/* Description */}
        <div className="mb-8">
          <h2 className="text-[17px] font-semibold mb-4 text-[#000000]">
            Добро пожаловать
          </h2>
          <div className="space-y-4 text-[16px] text-[#000000] leading-relaxed">
            <p>
              Гостевой дом расположен в живописном месте среди гор и лесов, вдали от городской суеты. Мы предлагаем нашим гостям комфортное проживание в уютных номерах с прекрасным видом на природу.
            </p>
            <p>
              Наша цель — создать для вас атмосферу домашнего уюта и обеспечить незабываемый отдых. Мы заботимся о каждом госте и стремимся сделать ваше пребывание максимально комфортным.
            </p>
            <p>
              У нас вы найдете домашнюю кухню, чистые номера и дружелюбный персонал, готовый помочь в любой ситуации. Мы рады приветствовать вас в нашем доме!
            </p>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-8">
          <h2 className="text-[17px] font-semibold mb-4 text-[#000000]">
            Фотогалерея
          </h2>
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

        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-[17px] font-semibold mb-4 text-[#000000]">
            Контакты
          </h2>
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
              href="tel:+79001234567"
              className="flex items-center gap-4 p-4 bg-[#52a547]/10 rounded-lg border border-[#52a547]/20 hover:bg-[#52a547]/20 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#52a547] rounded-full text-white">
                <Phone size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-[#666666] mb-1">Телефон</p>
                <p className="text-[16px] font-semibold text-[#52a547]">+7 (900) 123-45-67</p>
              </div>
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="p-4 bg-[#f5f5f5] rounded-lg">
          <p className="text-[14px] text-[#666666] text-center mb-2">
            Режим работы администрации
          </p>
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
