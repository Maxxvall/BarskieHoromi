import { useState } from 'react';
import { Header } from './Header';
import { Plus, Minus, Calendar } from 'lucide-react';
import { toast } from 'sonner';
// Tabs (Radix) replaced with simple buttons in this page to ensure consistent styling across builds
// import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { sendOrderToTelegram, getTelegramUserData, formatUserName } from '../lib/telegram-api';

interface MenuPageProps {
  onBack: () => void;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

export function MenuPage({ onBack }: MenuPageProps) {
  const [mealType, setMealType] = useState<'breakfast' | 'dinner'>('breakfast');
  const [orderDate, setOrderDate] = useState<'tomorrow' | 'dayAfter'>('tomorrow');
  const [cart, setCart] = useState<OrderItem[]>([]);

  // Simplified menu: one complex meal per meal type as requested
  const breakfastItems: MenuItem[] = [
    { id: 'b-complex', name: 'Завтрак комплексный', price: 500, category: 'breakfast' },
  ];

  const dinnerItems: MenuItem[] = [
    { id: 'd-complex', name: 'Ужин комплексный', price: 1000, category: 'dinner' },
  ];

  const currentItems = mealType === 'breakfast' ? breakfastItems : dinnerItems;

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      );
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== itemId));
    }
  };

  const getItemQuantity = (itemId: string) => {
    return cart.find((item) => item.id === itemId)?.quantity || 0;
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      toast.error('Выберите хотя бы одно блюдо');
      return;
    }

    const dateText = orderDate === 'tomorrow' ? 'завтра' : 'послезавтра';
    const mealText = mealType === 'breakfast' ? 'Завтрак' : 'Ужин';

    // Показываем индикатор загрузки
    const loadingToast = toast.loading('Отправляем заказ...');

    try {
      // Получаем данные пользователя из Telegram
      const userData = getTelegramUserData();
      const userName = formatUserName(userData);

      // Отправляем заказ в Telegram
      const success = await sendOrderToTelegram({
        items: cart,
        totalPrice,
        mealType,
        orderDate,
        userName,
        userId: userData?.id,
      });

      if (success) {
        toast.success(`Заказ на ${dateText} отправлен администратору!`, {
          description: `${mealText} на сумму ${totalPrice} ₽`,
          id: loadingToast,
        });

        // Очищаем корзину
        setCart([]);
      } else {
        toast.error('Не удалось отправить заказ', {
          description: 'Попробуйте еще раз',
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Произошла ошибка при отправке заказа', {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32 overflow-y-auto">
      <Header title="Меню" onBack={onBack} />

      <div className="px-4 py-6">
        {/* Meal Type Switcher - simple buttons to avoid data-attribute/Tailwind mismatch on some builds */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-pressed={mealType === 'breakfast'}
              onClick={() => setMealType('breakfast')}
              className={`rounded-md py-2 px-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0088cc]/30 active:opacity-90 ${
                mealType === 'breakfast' ? 'bg-[#0088cc] text-white' : 'bg-[#f5f5f5] text-[#666666]'
              }`}
            >
              Завтрак
            </button>
            <button
              type="button"
              aria-pressed={mealType === 'dinner'}
              onClick={() => setMealType('dinner')}
              className={`rounded-md py-2 px-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0088cc]/30 active:opacity-90 ${
                mealType === 'dinner' ? 'bg-[#0088cc] text-white' : 'bg-[#f5f5f5] text-[#666666]'
              }`}
            >
              Ужин
            </button>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-[14px] text-[#666666] mb-2">
            <Calendar size={16} />
            Выберите дату
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              aria-pressed={orderDate === 'tomorrow'}
              onClick={() => setOrderDate('tomorrow')}
              className={`flex-1 rounded-md py-2 px-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0088cc]/30 active:opacity-90 ${
                orderDate === 'tomorrow' ? 'bg-[#0088cc] text-white' : 'bg-[#f5f5f5] text-[#666666]'
              }`}
            >
              Завтра
            </button>
            <button
              type="button"
              aria-pressed={orderDate === 'dayAfter'}
              onClick={() => setOrderDate('dayAfter')}
              className={`flex-1 rounded-md py-2 px-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0088cc]/30 active:opacity-90 ${
                orderDate === 'dayAfter' ? 'bg-[#0088cc] text-white' : 'bg-[#f5f5f5] text-[#666666]'
              }`}
            >
              Послезавтра
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {currentItems.map((item) => {
            const quantity = getItemQuantity(item.id);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-[#f5f5f5] rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="text-[16px] font-semibold mb-1 text-[#000000]">{item.name}</h3>
                  <p className="text-[16px] text-[#0088cc] font-semibold">{item.price} ₽</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    disabled={quantity === 0}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-[#e9e9e9] text-[#666666] hover:border-[#0088cc] hover:text-[#0088cc] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Уменьшить количество"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center text-[16px] font-semibold">{quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0088cc] text-white hover:bg-[#0077b3] transition-all"
                    aria-label="Увеличить количество"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary (Fixed Bottom) */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e9e9e9] shadow-lg">
          <div className="mx-auto max-w-[480px] px-4 py-4">
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[14px] text-[#666666]">Итого:</span>
                <span className="text-[20px] font-semibold text-[#000000]">{totalPrice} ₽</span>
              </div>
              <p className="text-[14px] text-[#666666]">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} позиций
              </p>
            </div>
            <Button
              onClick={handleSubmitOrder}
              className="w-full bg-[#0088cc] text-white hover:bg-[#0077b3]"
              size="lg"
            >
              Подтвердить заказ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
