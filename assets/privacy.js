const COOKIE_NOTICE_KEY = 'formasuper_cookie_notice_accepted';
const PRIVACY_URL = '/privacy/';

function storageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    // If storage is blocked, the notice can simply appear again later.
  }
}

function ensureFooterPrivacyLink() {
  document.querySelectorAll('footer').forEach((footer) => {
    if (footer.querySelector('[data-privacy-link]')) return;
    const target = footer.lastElementChild || footer;
    const link = document.createElement('a');
    link.href = PRIVACY_URL;
    link.dataset.privacyLink = '1';
    link.textContent = 'Политика обработки персональных данных';
    target.append(link);
  });
}

function ensureLeadConsent() {
  document.querySelectorAll('#leadForm, form.lead-form').forEach((form) => {
    if (form.querySelector('[data-personal-consent]')) return;

    const submit = form.querySelector('button[type="submit"], .primary[type="submit"]');
    const label = document.createElement('label');
    label.className = 'privacy-consent';
    label.dataset.personalConsent = '1';
    label.innerHTML = '<input type="checkbox" name="personalDataConsent" required> <span>Согласен на обработку персональных данных для ответа на заявку. <a href="/privacy/" target="_blank" rel="noopener">Политика обработки персональных данных</a></span>';

    if (submit) {
      submit.before(label);
    } else {
      form.append(label);
    }
  });
}

function showCookieNotice() {
  if (storageGet(COOKIE_NOTICE_KEY) === '1' || document.querySelector('[data-cookie-notice]')) return;

  const notice = document.createElement('aside');
  notice.className = 'cookie-notice';
  notice.dataset.cookieNotice = '1';
  notice.setAttribute('role', 'status');
  notice.innerHTML = '<div><strong>Используем cookies</strong><span>Это делает работу с сайтом удобнее и помогает улучшать каталог.</span><a href="/privacy/">Подробнее</a></div><button type="button">Понятно</button>';

  notice.querySelector('button')?.addEventListener('click', () => {
    storageSet(COOKIE_NOTICE_KEY, '1');
    notice.remove();
  });

  document.body.append(notice);
}

function initPrivacyFeatures() {
  ensureFooterPrivacyLink();
  ensureLeadConsent();
  showCookieNotice();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPrivacyFeatures, { once: true });
} else {
  initPrivacyFeatures();
}

const observer = new MutationObserver(() => {
  ensureFooterPrivacyLink();
  ensureLeadConsent();
});
observer.observe(document.documentElement, { childList: true, subtree: true });
