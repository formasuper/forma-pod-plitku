const TELEGRAM_API = 'https://api.telegram.org/bot';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getField(body, name) {
  return String(body?.[name] ?? '').trim();
}

function json(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return json(res, 500, { ok: false, error: 'Telegram is not configured' });
  }

  const name = getField(req.body, 'name');
  const phone = getField(req.body, 'phone');
  const messenger = getField(req.body, 'messenger');
  const message = getField(req.body, 'message');
  const page = getField(req.body, 'page');

  if (!name || !phone || !messenger) {
    return json(res, 400, { ok: false, error: 'Required fields are missing' });
  }

  const text = [
    '<b>Новая заявка с сайта формаподплитку.рф</b>',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Мессенджер:</b> ${escapeHtml(messenger)}`,
    message ? `<b>Комментарий:</b> ${escapeHtml(message)}` : '',
    page ? `<b>Страница:</b> ${escapeHtml(page)}` : '',
  ].filter(Boolean).join('\n');

  const response = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    return json(res, 502, { ok: false, error: 'Telegram delivery failed', detail });
  }

  return json(res, 200, { ok: true });
}
