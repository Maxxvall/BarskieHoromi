import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const BOT_TOKEN = process.env.MAX_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    if (!BOT_TOKEN) {
      console.error('Missing MAX_BOT_TOKEN environment variable');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Expecting { webAppData: string } in body or { userLink: string }
    const { webAppData, userLink } = req.body || {};

    let appDataString: string | undefined = webAppData;

    if (!appDataString && typeof userLink === 'string') {
      try {
        const hash = new URL(userLink).hash.slice(1);
        const params = new URLSearchParams(hash);
        appDataString = params.get('WebAppData') || undefined;
      } catch (e) {
        // ignore
      }
    }

    if (!appDataString || typeof appDataString !== 'string') {
      return res.status(400).json({ error: 'webAppData not provided' });
    }

    // Split into pairs key=value
    const pairs = appDataString.split('&').map((x: string) => {
      const idx = x.indexOf('=');
      if (idx === -1) return [x, ''];
      const k = x.slice(0, idx);
      const v = x.slice(idx + 1);
      return [k, v];
    });

    // Ensure hash present once
    const hashCount = pairs.filter((p) => p[0] === 'hash').length;
    if (hashCount !== 1) {
      return res.status(400).json({ valid: false, reason: 'hash missing or duplicated' });
    }

    // Decode values
    for (const p of pairs) {
      p[1] = decodeURIComponent(p[1] || '');
    }

    const originalHash = pairs.find((p) => p[0] === 'hash')![1];

    // Sort by key
    pairs.sort((a, b) => a[0].localeCompare(b[0]));

    // Build launch_params excluding hash
    const launchParams = pairs
      .filter((p) => p[0] !== 'hash')
      .map((p) => `${p[0]}=${p[1]}`)
      .join('\n');

    // secret_key = HMAC_SHA256('WebAppData', BOT_TOKEN)
    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest();

    // signature = hex(HMAC_SHA256(secret_key, launch_params))
    const signature = crypto.createHmac('sha256', secretKey).update(launchParams).digest('hex');

    const valid = signature === originalHash;

    // Try to parse user and chat objects from the parameters (they are JSON strings)
    let parsedUser: any = null;
    let parsedChat: any = null;
    try {
      const userEntry = pairs.find((p) => p[0] === 'user');
      if (userEntry && userEntry[1] && userEntry[1] !== 'null') {
        parsedUser = JSON.parse(userEntry[1]);
      }
    } catch (e) {
      // ignore parse errors
      parsedUser = null;
    }

    try {
      const chatEntry = pairs.find((p) => p[0] === 'chat');
      if (chatEntry && chatEntry[1] && chatEntry[1] !== 'null') {
        parsedChat = JSON.parse(chatEntry[1]);
      }
    } catch (e) {
      parsedChat = null;
    }

    // Determine admin by environment variables (server-side check)
    const adminIds: string[] = [];
    if (process.env.MAX_ADMIN_CHAT_ID) adminIds.push(process.env.MAX_ADMIN_CHAT_ID);
    if (process.env.MAX_ADMIN_USER_ID) adminIds.push(process.env.MAX_ADMIN_USER_ID);
    if (process.env.TELEGRAM_ADMIN_CHAT_ID) adminIds.push(process.env.TELEGRAM_ADMIN_CHAT_ID);
    if (process.env.TELEGRAM_ADMIN_USER_ID) adminIds.push(process.env.TELEGRAM_ADMIN_USER_ID);
    if (process.env.ADMIN_CHAT_ID) adminIds.push(process.env.ADMIN_CHAT_ID);

    const userIdStr = parsedUser && parsedUser.id ? String(parsedUser.id) : null;
    const isAdmin = !!(valid && userIdStr && adminIds.includes(userIdStr));

    return res.status(200).json({ valid, user: parsedUser, chat: parsedChat, isAdmin });
  } catch (error) {
    console.error('Error validating WebAppData:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
