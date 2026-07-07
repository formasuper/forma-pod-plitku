const endpoint = window.FORMASUPER_LEAD_ENDPOINT || '/api/lead';

function findLeadForms() {
  return [...document.querySelectorAll('#leadForm, form.lead-form')];
}

function ensureStatus(form) {
  let status = form.querySelector('[data-lead-status]');
  if (!status) {
    status = document.createElement('p');
    status.dataset.leadStatus = '1';
    status.style.margin = '0';
    status.style.fontSize = '14px';
    form.append(status);
  }
  return status;
}

function setStatus(form, message, type = 'ok') {
  const status = ensureStatus(form);
  status.textContent = message;
  status.style.color = type === 'error' ? '#9d2f1f' : '#116149';
}

function prepareForm(form) {
  form.querySelector('[name="messengerOther"]')?.closest('label')?.remove();
  form.querySelectorAll('.form-note').forEach((note) => {
    if (note.textContent.includes('подготовленное письмо') || note.textContent.includes('Telegram-прием')) {
      note.remove();
    }
  });
}

async function submitLead(event) {
  const form = event.target;
  if (!form.matches('#leadForm, form.lead-form')) return;

  event.preventDefault();
  event.stopImmediatePropagation();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const originalText = button?.textContent;
  button?.setAttribute('disabled', 'disabled');
  if (button) button.textContent = 'Отправляем...';

  const payload = Object.fromEntries(new FormData(form).entries());
  delete payload.messengerOther;
  delete payload.personalDataConsent;
  payload.page = window.location.href;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    form.reset();
    setStatus(form, 'Заявка отправлена. Мы свяжемся с вами в выбранном мессенджере.');
    setTimeout(() => document.getElementById('leadDialog')?.close?.(), 1600);
  } catch (error) {
    setStatus(form, 'Не удалось отправить заявку. Напишите в Telegram: +7 928 436-30-00 или на formasuper@bk.ru.', 'error');
  } finally {
    button?.removeAttribute('disabled');
    if (button && originalText) button.textContent = originalText;
  }
}

findLeadForms().forEach(prepareForm);
document.addEventListener('submit', submitLead, true);
import('/assets/privacy.js?v=20260707').catch(() => {});
