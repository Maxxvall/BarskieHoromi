// Vercel Serverless Function для управления промокодом
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Глобальная переменная для хранения текущего промокода (не persistent на Vercel)
let currentPromoCode: string | null = null;

// Функция для генерации случайного промокода
function generateRandomPromoCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Функция для получения текущего промокода (генерирует новый, если нет)
function getCurrentPromoCode(): string {
  if (!currentPromoCode) {
    // Генерируем новый промокод при первом обращении
    currentPromoCode = generateRandomPromoCode();
  }
  return currentPromoCode;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Получить текущий промокод
      const promoCode = getCurrentPromoCode();
      return res.status(200).json({ promoCode });
    } else if (req.method === 'POST') {
      // Проверить авторизацию админа
      const userId = req.body?.userId;
      const ADMIN_ID = process.env.ADMIN_CHAT_ID;

      if (!userId || userId.toString() !== ADMIN_ID) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      // Генерировать новый промокод
      currentPromoCode = generateRandomPromoCode();
      return res.status(200).json({
        success: true,
        promoCode: currentPromoCode,
        message: 'Новый промокод сгенерирован',
      });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Promo code API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
