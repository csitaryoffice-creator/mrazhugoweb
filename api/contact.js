'use strict';

function redirect(res, state) {
  res.setHeader('Location', `/?form=${encodeURIComponent(state)}#kapcsolat`);
  res.status(303).end();
}

function cleanText(value, maxLength) {
  return String(value || '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function parseBody(body) {
  if (body && typeof body === 'object') return body;
  return Object.fromEntries(new URLSearchParams(String(body || '')));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Ez a végpont csak POST kérést fogad.');
  }

  const recipient = process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!recipient || !apiKey || !from) return redirect(res, 'config');

  const body = parseBody(req.body);
  if (cleanText(body.website, 200)) return redirect(res, 'success');

  const startedAt = Number.parseInt(body.form_started_at, 10);
  const elapsed = Math.floor(Date.now() / 1000) - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < 3 || elapsed > 86400) return redirect(res, 'error');

  const name = cleanText(body.name, 120);
  const phone = cleanText(body.phone, 40);
  const email = cleanText(body.email, 254);
  const city = cleanText(body.city, 100);
  const service = cleanText(body.service, 100);
  const message = cleanText(body.message, 3000);
  const privacy = String(body.privacy || '');
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^[0-9+()/ .-]{7,40}$/.test(phone);

  if (!name || !phoneValid || !emailValid || privacy !== 'accepted') return redirect(res, 'error');
  if ((message.match(/https?:\/\//gi) || []).length > 3) return redirect(res, 'error');

  const text = [
    `Név: ${name}`,
    `Telefonszám: ${phone}`,
    `E-mail: ${email}`,
    `Település: ${city || 'nincs megadva'}`,
    `Szolgáltatás: ${service || 'nincs kiválasztva'}`,
    '',
    'Üzenet:',
    message || 'nincs megadva'
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: 'Új ajánlatkérés a weboldalról',
        text
      })
    });
    return redirect(res, response.ok ? 'success' : 'error');
  } catch (_) {
    return redirect(res, 'error');
  }
};
