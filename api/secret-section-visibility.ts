// Vercel Serverless Function для управления видимостью секретного раздела
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Глобальная переменная для хранения состояния видимости (не persistent на Vercel)
let isSecretSectionVisible: boolean = true;

// Функция для получения текущего состояния видимости
function getSecretSectionVisibility(): boolean {
  return isSecretSectionVisible;
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
      // Получить текущее состояние видимости
      const isVisible = getSecretSectionVisibility();
      return res.status(200).json({ isVisible });
    } else if (req.method === 'POST') {
      // Проверить авторизацию админа
      const userId = req.body?.userId;
      const ADMIN_ID = process.env.ADMIN_CHAT_ID;

      if (!userId || userId.toString() !== ADMIN_ID) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      // Переключить состояние видимости
      isSecretSectionVisible = !isSecretSectionVisible;
      return res.status(200).json({
        success: true,
        isVisible: isSecretSectionVisible,
        message: `Секретный раздел ${isSecretSectionVisible ? 'показан' : 'скрыт'}`,
      });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Secret section visibility API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
