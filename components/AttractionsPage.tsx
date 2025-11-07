import { Header } from './Header';
import { Mountain, Church, TreePine, Waves, Camera, Phone, Ambulance, Shield } from 'lucide-react';

interface AttractionsPageProps {
  onBack: () => void;
}

export function AttractionsPage({ onBack }: AttractionsPageProps) {
  const attractions = [
    {
      icon: <Mountain size={24} />,
      name: 'Гора Белуха',
      description: 'Живописная вершина с потрясающими видами. Подъем занимает 2-3 часа.',
    },
    {
      icon: <Church size={24} />,
      name: 'Старинная церковь',
      description: 'Памятник архитектуры XIX века в центре поселка.',
    },
    {
      icon: <TreePine size={24} />,
      name: 'Кедровая роща',
      description: 'Заповедный лес с вековыми кедрами. Отличное место для прогулок.',
    },
    {
      icon: <Waves size={24} />,
      name: 'Озеро Светлое',
      description: 'Чистейшее горное озеро в 5 км от гостевого дома.',
    },
    {
      icon: <Camera size={24} />,
      name: 'Смотровая площадка',
      description: 'Панорамный вид на долину и окрестности. Идеально для фото.',
    },
  ];

  const emergencyContacts = [
    { icon: <Ambulance size={20} />, name: 'Скорая помощь', phone: '103' },
    { icon: <Shield size={20} />, name: 'Полиция', phone: '102' },
    { icon: <Phone size={20} />, name: 'Экстренная служба', phone: '112' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <Header title="Достопримечательности" onBack={onBack} />
      
      <div className="px-4 py-6">
        {/* Attractions List */}
        <div className="mb-8">
          <h2 className="text-[17px] font-semibold mb-4 text-[#000000]">
            Места для посещения
          </h2>
          <div className="space-y-3">
            {attractions.map((attraction, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 bg-[#f5f5f5] rounded-lg"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-[#0088cc]/10 rounded-lg text-[#0088cc] flex-shrink-0">
                  {attraction.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] font-semibold mb-1 text-[#000000]">
                    {attraction.name}
                  </h3>
                  <p className="text-[14px] text-[#666666]">
                    {attraction.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div>
          <h2 className="text-[17px] font-semibold mb-4 text-[#000000]">
            Экстренные контакты
          </h2>
          <div className="space-y-2">
            {emergencyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.phone}`}
                className="flex items-center justify-between p-4 bg-[#f5f5f5] rounded-lg hover:bg-[#e9e9e9] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-[#e6406c]/10 rounded-lg text-[#e6406c]">
                    {contact.icon}
                  </div>
                  <span className="text-[16px] text-[#000000]">{contact.name}</span>
                </div>
                <span className="text-[16px] font-semibold text-[#0088cc]">
                  {contact.phone}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
