// Утилита для отправки заказов в Telegram через API

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name?: string;
            last_name?: string;
            username?: string;
          };
        };
      };
    };
  }
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface SendOrderParams {
  items: OrderItem[];
  totalPrice: number;
  mealType: 'breakfast' | 'dinner';
  orderDate: 'tomorrow' | 'dayAfter';
  userName?: string;
  userId?: number;
}

export async function sendOrderToTelegram(params: SendOrderParams): Promise<boolean> {
  try {
    const response = await fetch('/api/send-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to send order:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending order:', error);
    return false;
  }
}

// Получаем данные пользователя из Telegram Web App
export function getTelegramUserData() {
  if (typeof window === 'undefined') return null;

  const tg = window.Telegram?.WebApp;
  if (!tg || !tg.initDataUnsafe?.user) return null;

  return {
    id: tg.initDataUnsafe.user.id,
    firstName: tg.initDataUnsafe.user.first_name,
    lastName: tg.initDataUnsafe.user.last_name,
    username: tg.initDataUnsafe.user.username,
  };
}

// Форматирует имя пользователя
export function formatUserName(userData: ReturnType<typeof getTelegramUserData>): string {
  if (!userData) return 'Гость';

  const parts = [userData.firstName, userData.lastName].filter(Boolean);
  const name = parts.join(' ');

  if (userData.username) {
    return `${name} (@${userData.username})`;
  }

  return name || 'Гость';
}
