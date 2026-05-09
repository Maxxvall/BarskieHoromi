// Alternative placement for ONREZA Edge Function: server/api/send-order.ts
// Some adapters pick up functions from 'server/' folder.

export default async function handler(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const botToken = process.env.VITE_BOT_TOKEN || process.env.BOT_TOKEN;
    const adminUserId = process.env.VITE_ADMIN_USER_ID || process.env.ADMIN_USER_ID;

    if (!botToken || !adminUserId) {
      console.error('Missing env vars: VITE_BOT_TOKEN or VITE_ADMIN_USER_ID');
      return Response.json({ error: 'Server configuration error: missing VITE_BOT_TOKEN or VITE_ADMIN_USER_ID' }, { status: 500 });
    }

    const body = await request.json().catch(() => ({}));
    const text = body?.text;
    if (!text) {
      return Response.json({ error: 'Missing "text" in request body' }, { status: 400 });
    }

    const resp = await fetch('https://platform-api.max.ru/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': botToken,
      },
      body: JSON.stringify({ userId: Number(adminUserId), text, format: 'markdown' }),
    });

    const respText = await resp.text();
    return new Response(respText, { status: resp.status, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('send-order error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
