import { Header } from './Header';
import { Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Page } from '../App';

interface ShopPageProps {
  onNavigate: (page: Page) => void;
  onBack: () => void;
}

export function ShopPage({ onNavigate, onBack }: ShopPageProps) {
  const souvenirs = [
    {
      id: 's1',
      name: 'Матрёшка расписная',
      price: 800,
      image: 'https://images.unsplash.com/photo-1619820358955-31de861d2a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHJ1c3NpYW4lMjBzb3V2ZW5pciUyMG1hdHJ5b3Noa2F8ZW58MXx8fHwxNzYyNTQ3MDgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 's2',
      name: 'Деревянная ложка',
      price: 350,
      image: 'https://images.unsplash.com/photo-1661873482206-4e2fa0ba455d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHdvb2RlbiUyMGNyYWZ0fGVufDF8fHx8MTc2MjU0NzA4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 's3',
      name: 'Керамическая кружка',
      price: 450,
      image: 'https://images.unsplash.com/photo-1648372429968-8d649cab1389?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwbXVnJTIwc291dmVuaXJ8ZW58MXx8fHwxNzYyNTQ3MDgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 's4',
      name: 'Магнит с видом гор',
      price: 150,
      image: 'https://images.unsplash.com/photo-1605972013598-be8367a96e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWVzdGhvdXNlJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzYyNTQ3MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 's5',
      name: 'Открытки набор (5 шт)',
      price: 200,
      image: 'https://images.unsplash.com/photo-1737737210863-387afd35344e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaW50ZXJpb3IlMjByb29tfGVufDF8fHx8MTc2MjU0NzA4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 's6',
      name: 'Текстильный платок',
      price: 600,
      image: 'https://images.unsplash.com/photo-1619820358955-31de861d2a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHJ1c3NpYW4lMjBzb3V2ZW5pciUyMG1hdHJ5b3Noa2F8ZW58MXx8fHwxNzYyNTQ3MDgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header title="Магазин" onBack={onBack} />
      
      <div className="px-4 py-6">
        {/* Souvenirs Section */}
        <div className="mb-8">
          <h2 className="text-[17px] font-semibold mb-4 text-[#000000]">
            Сувениры
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {souvenirs.map(souvenir => (
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
                  <p className="text-[16px] text-[#0088cc] font-semibold">
                    {souvenir.price} ₽
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alcohol Promo Section */}
        <div className="bg-gradient-to-r from-[#0088cc]/10 to-[#52a547]/10 rounded-lg p-6 border border-[#0088cc]/20">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-[#0088cc]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock size={24} className="text-[#0088cc]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-semibold mb-2 text-[#000000]">
                Секретный раздел
              </h3>
              <p className="text-[14px] text-[#666666] mb-4">
                Хотите приобрести алкогольные напитки? Введите промокод из карточки в номере.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('alcohol')}
            className="w-full py-3 bg-[#0088cc] text-white rounded-lg font-semibold hover:bg-[#0077b3] transition-all"
          >
            Показать алкоголь
          </button>
        </div>

        {/* Info Text */}
        <div className="mt-6 p-4 bg-[#f5f5f5] rounded-lg">
          <p className="text-[14px] text-[#666666] text-center">
            Все товары можно приобрести при выезде на ресепшене
          </p>
        </div>
      </div>
    </div>
  );
}
