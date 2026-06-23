import { Header } from './Header';
import { Camera, Phone, Ambulance, Shield } from 'lucide-react';

interface AttractionsPageProps {
  onBack: () => void;
}

export function AttractionsPage({ onBack }: AttractionsPageProps) {
  const attractions = [
    {
      icon: <Camera size={24} />,
      name: 'Беломорские петроглифы',
      description:
        'Древние наскальные рисунки на Белом море. Уникальные артефакты древней культуры.',
      link: 'https://vk.com/zalav',
    },
    {
      icon: <Shield size={24} />,
      name: 'Музей Карельского фронта',
      description:
        'Музей, посвященный истории Карельского фронта. Уникальные экспонаты и артефакты войны.',
      link: 'https://vk.com/mkf10',
    },
    {
      icon: <Camera size={24} />,
      name: 'Белое море и окрестности',
      description: 'Красивые виды Белого моря и окружающих ландшафтов.',
    },
    {
      icon: <Camera size={24} />,
      name: 'Экскурсионное бюро города Беломорск',
      description: 'Организация экскурсий по достопримечательностям Беломорска и окрестностей.',
      link: 'https://vk.com/mypetroglyphs',
    },
  ];

  const emergencyContacts = [
    { icon: <Ambulance size={20} />, name: 'Скорая помощь', phone: '103' },
    { icon: <Shield size={20} />, name: 'Полиция', phone: '102' },
    { icon: <Phone size={20} />, name: 'Такси', phone: '112' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <Header title="Достопримечательности" onBack={onBack} />

      <div className="px-4 py-6">
        {/* Attractions List */}
        <div className="mb-8">
          <h2 className="text-[18px] font-light tracking-tight mb-4 text-[#000000]">Места для посещения</h2>
          <div className="space-y-3">
            {attractions.map((attraction, index) => (
              <div key={index} className="flex gap-3 p-4 bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 shadow-elevation-1 [@supportsnot(backdrop-filter:blur(1px))]:bg-white/90">
                <div className="flex items-center justify-center w-10 h-10 bg-[#0088cc]/8 rounded-xl text-[#0088cc] flex-shrink-0">
                  {attraction.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] font-medium mb-1 text-[#000000]">
                    {attraction.name}
                  </h3>
                  <p className="text-[14px] text-[#666666]">{attraction.description}</p>
                  {attraction.link && (
                    <a
                      href={attraction.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[#0088cc] underline mt-1 block"
                    >
                      Подробнее в группе
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div>
          <h2 className="text-[18px] font-light tracking-tight mb-4 text-[#000000]">Экстренные контакты</h2>
          <div className="space-y-2">
            {emergencyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.phone}`}
                className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 shadow-elevation-1 hover:bg-white/80 transition-all duration-200 [@supportsnot(backdrop-filter:blur(1px))]:bg-white/90"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-[#e6406c]/8 rounded-xl text-[#e6406c]">
                    {contact.icon}
                  </div>
                  <span className="text-[16px] text-[#000000]">{contact.name}</span>
                </div>
                <span className="text-[16px] font-semibold text-[#0088cc]">{contact.phone}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
