import { useState } from 'react';
import { Header } from './Header';
import { Lock, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AlcoholPageProps {
  onBack: () => void;
}

export function AlcoholPage({ onBack }: AlcoholPageProps) {
  const [promoCode, setPromoCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  // Generate current month code (e.g., "NOV2025")
  const getCurrentMonthCode = () => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const now = new Date();
    return `${months[now.getMonth()]}${now.getFullYear()}`;
  };

  const alcoholItems = [
    {
      id: 'a1',
      name: 'Вино красное сухое',
      price: 1200,
      volume: '750 мл',
      image: 'https://images.unsplash.com/photo-1606920301459-d66500c43ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYyNTQ3MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'a2',
      name: 'Вино белое полусладкое',
      price: 1100,
      volume: '750 мл',
      image: 'https://images.unsplash.com/photo-1606920301459-d66500c43ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYyNTQ3MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'a3',
      name: 'Пиво светлое',
      price: 250,
      volume: '500 мл',
      image: 'https://images.unsplash.com/photo-1606920301459-d66500c43ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYyNTQ3MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'a4',
      name: 'Коньяк выдержанный',
      price: 2500,
      volume: '500 мл',
      image: 'https://images.unsplash.com/photo-1606920301459-d66500c43ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYyNTQ3MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validCode = getCurrentMonthCode();
    
    if (promoCode.toUpperCase() === validCode) {
      setIsUnlocked(true);
    } else {
      setError('Промокод недействителен. Спросите код у администратора.');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-white overflow-y-auto">
        <Header title="Алкоголь" onBack={onBack} />
        
        <div className="px-4 py-8">
          <div className="max-w-md mx-auto">
            {/* Lock Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#0088cc]/10 rounded-full flex items-center justify-center">
                <Lock size={40} className="text-[#0088cc]" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-[20px] font-semibold text-center mb-2 text-[#000000]">
              Введите промокод
            </h2>
            <p className="text-[14px] text-[#666666] text-center mb-8">
              Промокод находится в карточке при заселении. Он обновляется каждый месяц.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Введите промокод"
                  className="w-full h-12 px-4 border border-[#e9e9e9] rounded-lg text-[16px] focus:outline-none focus:border-[#0088cc] focus:ring-2 focus:ring-[#0088cc]/20 transition-all"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-[#e6406c]/10 border border-[#e6406c]/20 rounded-lg">
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

            {/* Hint */}
            <div className="mt-8 p-4 bg-[#f5f5f5] rounded-lg">
              <p className="text-[14px] text-[#666666] text-center">
                Подсказка: промокод состоит из сокращенного названия текущего месяца и года (например, JAN2025)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <Header title="Алкоголь" onBack={onBack} />
      
      <div className="px-4 py-6">
        {/* Success Message */}
        <div className="mb-6 p-4 bg-[#52a547]/10 border border-[#52a547]/20 rounded-lg">
          <p className="text-[14px] text-[#52a547] text-center font-semibold">
            Доступ разрешен
          </p>
        </div>

        {/* Alcohol Items */}
        <div className="grid grid-cols-2 gap-3">
          {alcoholItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-[#e9e9e9] overflow-hidden shadow-sm"
            >
              <div className="aspect-square bg-[#f5f5f5] relative">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-[14px] font-semibold mb-1 text-[#000000] line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-[12px] text-[#666666] mb-2">{item.volume}</p>
                <p className="text-[16px] text-[#0088cc] font-semibold">
                  {item.price} ₽
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="mt-6 p-4 bg-[#faa61a]/10 border border-[#faa61a]/20 rounded-lg">
          <p className="text-[14px] text-[#666666] text-center">
            Продажа алкогольной продукции лицам младше 18 лет запрещена
          </p>
        </div>

        {/* Info Text */}
        <div className="mt-4 p-4 bg-[#f5f5f5] rounded-lg">
          <p className="text-[14px] text-[#666666] text-center">
            Все товары можно приобрести при выезде на ресепшене
          </p>
        </div>
      </div>
    </div>
  );
}
