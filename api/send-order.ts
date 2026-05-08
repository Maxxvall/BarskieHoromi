// Vercel Serverless Function для отправки заказов в Telegram
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  items: OrderItem[];
  totalPrice: number;
  mealType: 'breakfast' | 'dinner';
  orderDate: 'tomorrow' | 'dayAfter';
  userName?: string;
  userId?: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const platform = (body.platform || 'telegram').toString();

    // Choose tokens and chat IDs per platform
    let BOT_TOKEN: string | undefined;
    let ADMIN_CHAT_ID: string | undefined;

    if (platform === 'max') {
      BOT_TOKEN = process.env.MAX_BOT_TOKEN;
      ADMIN_CHAT_ID = process.env.MAX_ADMIN_CHAT_ID;
    } else {
      BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || process.env.ADMIN_CHAT_ID;
    }

    if (!BOT_TOKEN || !ADMIN_CHAT_ID) {
      console.error('Missing environment variables for platform', platform);
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const orderData: OrderData = body;

    // Валидация данных
    if (!orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ error: 'No items in order' });
    }

    // Форматируем сообщение для Telegram
    const mealTypeText = orderData.mealType === 'breakfast' ? '🌅 Завтрак' : '🌙 Ужин';
    const dateText = orderData.orderDate === 'tomorrow' ? 'завтра' : 'послезавтра';
    
    let message = `🔔 <b>Новый заказ!</b>\n\n`;
    message += `${mealTypeText} на <b>${dateText}</b>\n\n`;
    message += `📋 <b>Состав заказа:</b>\n`;
    
    orderData.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x${item.quantity} — ${item.price * item.quantity} ₽\n`;
    });
    
    message += `\n💰 <b>Итого:</b> ${orderData.totalPrice} ₽\n`;
    
    if (orderData.userName) {
      message += `\n👤 <b>Гость:</b> ${orderData.userName}`;
      if (orderData.userId) {
        message += ` (ID: ${orderData.userId})`;
      }
    }

    // Отправляем сообщение в зависимости от платформы
    if (platform === 'telegram') {
      const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: ADMIN_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Telegram API error:', data);
        return res.status(500).json({ error: 'Failed to send message' });
      }

      return res.status(200).json({ success: true, message: 'Order sent successfully', platform: 'telegram' });
    }

    // Platform: MAX (assumes MAX API base URL in MAX_API_URL env or default)
    if (platform === 'max') {
      const MAX_API_URL = process.env.MAX_API_URL || 'https://platform-api.max.ru';
      const maxUrl = `${MAX_API_URL.replace(/\/$/, '')}/messages`;

      const response = await fetch(maxUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${BOT_TOKEN}`,
        },
        body: JSON.stringify({
          chat_id: ADMIN_CHAT_ID,
          text: message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error('MAX API error:', data);
        return res.status(500).json({ error: 'Failed to send message (MAX)', details: data });
      }

      return res.status(200).json({ success: true, message: 'Order sent successfully', platform: 'max', data });
    }

    return res.status(400).json({ error: 'Unknown platform' });
  } catch (error) {
    console.error('Error sending order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
