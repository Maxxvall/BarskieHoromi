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
    const isMax = typeof window !== 'undefined' && !!(window as any).WebApp;
    const platform = isMax ? 'max' : 'telegram';

    const response = await fetch('/api/send-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...params, platform }),
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

  // Support both Telegram and MAX WebApp globals
  const app = (window as any).Telegram?.WebApp || (window as any).WebApp;
  if (!app || !app.initDataUnsafe?.user) return null;

  const user = app.initDataUnsafe.user;
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
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
