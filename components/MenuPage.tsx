import { useState } from 'react';
import { Header } from './Header';
import { Plus, Minus, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';

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

  const breakfastItems: MenuItem[] = [
    { id: 'b1', name: 'Омлет с овощами', price: 250, category: 'breakfast' },
    { id: 'b2', name: 'Блины с вареньем', price: 200, category: 'breakfast' },
    { id: 'b3', name: 'Каша овсяная', price: 150, category: 'breakfast' },
    { id: 'b4', name: 'Сырники со сметаной', price: 280, category: 'breakfast' },
    { id: 'b5', name: 'Бутерброды с сыром', price: 180, category: 'breakfast' },
  ];

  const dinnerItems: MenuItem[] = [
    { id: 'd1', name: 'Борщ домашний', price: 300, category: 'dinner' },
    { id: 'd2', name: 'Плов узбекский', price: 400, category: 'dinner' },
    { id: 'd3', name: 'Котлеты с пюре', price: 350, category: 'dinner' },
    { id: 'd4', name: 'Рыба на пару с овощами', price: 450, category: 'dinner' },
    { id: 'd5', name: 'Салат Цезарь', price: 280, category: 'dinner' },
    { id: 'd6', name: 'Компот домашний', price: 80, category: 'dinner' },
  ];

  const currentItems = mealType === 'breakfast' ? breakfastItems : dinnerItems;

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getItemQuantity = (itemId: string) => {
    return cart.find(item => item.id === itemId)?.quantity || 0;
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitOrder = () => {
    if (cart.length === 0) {
      toast.error('Выберите хотя бы одно блюдо');
      return;
    }

    const dateText = orderDate === 'tomorrow' ? 'завтра' : 'послезавтра';
    const mealText = mealType === 'breakfast' ? 'Завтрак' : 'Ужин';
    
    // Simulate sending order to admin
    toast.success(`Заказ на ${dateText} отправлен администратору!`, {
      description: `${mealText} на сумму ${totalPrice} ₽`,
    });
    
    // Clear cart
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 overflow-y-auto">
      <Header title="Меню" onBack={onBack} />
      
      <div className="px-4 py-6">
        {/* Meal Type Switcher */}
        <Tabs value={mealType} onValueChange={(value) => setMealType(value as 'breakfast' | 'dinner')} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breakfast">Завтрак</TabsTrigger>
            <TabsTrigger value="dinner">Ужин</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Date Selection */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-[14px] text-[#666666] mb-2">
            <Calendar size={16} />
            Выберите дату
          </label>
          <div className="flex gap-2">
            <Button
              variant={orderDate === 'tomorrow' ? 'default' : 'outline'}
              onClick={() => setOrderDate('tomorrow')}
              className="flex-1"
            >
              Завтра
            </Button>
            <Button
              variant={orderDate === 'dayAfter' ? 'default' : 'outline'}
              onClick={() => setOrderDate('dayAfter')}
              className="flex-1"
            >
              Послезавтра
            </Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {currentItems.map(item => {
            const quantity = getItemQuantity(item.id);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-[#f5f5f5] rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="text-[16px] font-semibold mb-1 text-[#000000]">
                    {item.name}
                  </h3>
                  <p className="text-[16px] text-[#0088cc] font-semibold">
                    {item.price} ₽
                  </p>
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
                  <span className="w-6 text-center text-[16px] font-semibold">
                    {quantity}
                  </span>
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
                <span className="text-[20px] font-semibold text-[#000000]">
                  {totalPrice} ₽
                </span>
              </div>
              <p className="text-[14px] text-[#666666]">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} позиций
              </p>
            </div>
            <Button
              onClick={handleSubmitOrder}
              className="w-full"
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
