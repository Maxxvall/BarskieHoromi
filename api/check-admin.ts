import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body || {};
    if (!userId) {
      return res.status(400).json({ error: 'userId not provided' });
    }

    const adminIds: string[] = [];
    if (process.env.MAX_ADMIN_CHAT_ID) adminIds.push(process.env.MAX_ADMIN_CHAT_ID);
    if (process.env.MAX_ADMIN_USER_ID) adminIds.push(process.env.MAX_ADMIN_USER_ID);
    if (process.env.TELEGRAM_ADMIN_CHAT_ID) adminIds.push(process.env.TELEGRAM_ADMIN_CHAT_ID);
    if (process.env.TELEGRAM_ADMIN_USER_ID) adminIds.push(process.env.TELEGRAM_ADMIN_USER_ID);
    if (process.env.ADMIN_CHAT_ID) adminIds.push(process.env.ADMIN_CHAT_ID);

    const userIdStr = String(userId);
    const isAdmin = adminIds.includes(userIdStr);

    return res.status(200).json({ isAdmin, userId: userIdStr });
  } catch (error) {
    console.error('Error checking admin:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
