const sectionId = location.pathname.split('/').filter(Boolean)[1];
const root = document.getElementById('sectionCatalog');
const titleEl = document.getElementById('sectionTitle');
const introEl = document.getElementById('sectionIntro');
const dialog = document.getElementById('leadDialog');
const SITE = 'https://формаподплитку.рф';

function bindLead(scope = document) {
  scope.querySelectorAll('[data-open-lead]').forEach((button) => {
    if (button.dataset.boundLead) return;
    button.dataset.boundLead = '1';
    button.addEventListener('click', () => {
      const form = document.getElementById('leadForm');
      if (button.dataset.product && form?.elements.message && !form.elements.message.value) {
        form.elements.message.value = 'Интересует товар: ' + button.dataset.product + '. ';
      }
      dialog?.showModal?.();
    });
  });
}

function e(value) {
  return String(value ?? '').replace(/[&<>"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  }[char]));
}

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (!el || !value) return;
  el.setAttribute(attr, value);
}

function imageUrl(src) {
  if (!src) return '';
  return src.startsWith('/') ? SITE + src : src;
}

function imageCell(product) {
  const src = product[5];
  if (!src) return '<span class="seo-thumb seo-thumb-empty">Фото</span>';
  return '<img class="seo-thumb" src="' + e(src) + '" alt="' + e(product[1]) + '" loading="lazy">';
}

function row(product) {
  return '<tr><td>' + imageCell(product) + '</td><td>' + e(product[0]) + '</td><td>' + e(product[1]) + '</td><td>' + e(product[2] || 'уточняется') + '</td><td>' + e(product[3] || '-') + '</td><td><b>' + e(product[4]) + ' ₽/шт</b></td><td><button data-open-lead data-product="' + e(product[0]) + '">Заказать</button></td></tr>';
}

function paragraphs(text) {
  return String(text || '')
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((item) => '<p>' + e(item) + '</p>')
    .join('');
}

function faqHtml(faq = []) {
  if (!faq.length) return '';
  return '<section class="section-faq"><h2>Вопросы по разделу</h2>' + faq.map((item) => '<details><summary>' + e(item.question) + '</summary><p>' + e(item.answer) + '</p></details>').join('') + '</section>';
}

function productSchema(product, sectionName) {
  const item = {
    '@type': 'Product',
    name: product[1],
    sku: String(product[0]),
    category: sectionName,
    description: product[1] + ', размер ' + (product[2] || 'уточняется'),
    offers: {
      '@type': 'Offer',
      price: String(product[4] || ''),
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock'
    }
  };
  if (product[5]) item.image = imageUrl(product[5]);
  return item;
}

function addJsonLd(item) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(item);
  document.head.appendChild(script);
}

function addSchema(section, seo) {
  addJsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Формы ' + section[1],
    itemListElement: (section[2] || []).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: productSchema(product, section[1])
    }))
  });
  addJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Каталог', item: SITE + '/catalog/' },
      { '@type': 'ListItem', position: 3, name: section[1], item: SITE + '/catalog/' + section[0] + '/' }
    ]
  });
  if (seo?.faq?.length) {
    addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: seo.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    });
  }
}

function addStyle() {
  const style = document.createElement('style');
  style.textContent = '.section-seo-copy{background:white;border:1px solid var(--line);border-radius:8px;padding:24px;margin-bottom:28px}.section-seo-copy h2{font-size:28px;margin:0 0 14px}.section-seo-copy p{font-size:18px;line-height:1.65;color:#334038}.seo-table-wrap{overflow:auto;background:white;border:1px solid var(--line);border-radius:8px}.seo-product-table{width:100%;border-collapse:collapse;min-width:860px}.seo-product-table th,.seo-product-table td{padding:12px 14px;border-bottom:1px solid var(--line);text-align:left;vertical-align:middle}.seo-product-table th{background:#eef3ee;color:var(--green);font-size:14px;text-transform:uppercase}.seo-product-table tr:last-child td{border-bottom:0}.seo-product-table button{padding:9px 12px}.seo-thumb{width:88px;height:66px;object-fit:cover;border-radius:8px;background:#eef3ee;display:block}.seo-thumb-empty{display:grid;place-items:center;color:var(--muted);font-size:13px;font-weight:700;border:1px dashed var(--line)}.section-faq{margin-top:36px}.section-faq h2{font-size:28px}.section-faq details{background:white;border:1px solid var(--line);border-radius:8px;padding:16px;margin-bottom:10px}.section-faq summary{cursor:pointer;font-weight:700;color:var(--green)}.section-faq p{margin:10px 0 0;color:#334038;line-height:1.6}.section-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}@media(max-width:860px){.seo-product-table{min-width:760px}.seo-thumb{width:76px;height:58px}.section-seo-copy{padding:18px}}';
  document.head.appendChild(style);
}

async function loadSectionSeo(id) {
  try {
    const response = await fetch('/data/section-seo/' + id + '.json', { cache: 'no-store' });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    return null;
  }
}

async function init() {
  bindLead();
  addStyle();
  if (!root || !sectionId) return;
  try {
    const [data, seo] = await Promise.all([
      fetch('/data/catalog.json', { cache: 'no-store' }).then((response) => response.json()),
      loadSectionSeo(sectionId)
    ]);
    const section = (data.sections || []).find((item) => item[0] === sectionId);
    if (!section) {
      root.innerHTML = '<p class="form-note">Раздел не найден.</p>';
      return;
    }
    const count = (section[2] || []).length;
    const fallbackTitle = section[1] + ' - формы для тротуарной плитки купить';
    const fallbackDesc = section[1] + ': ' + count + ' позиций форм FORMASUPER для плитки и благоустройства. Артикулы, размеры и цены с доставкой по России и СНГ.';
    const pageTitle = seo?.title || fallbackTitle;
    const pageDesc = seo?.description || fallbackDesc;
    document.title = pageTitle;
    setMeta('meta[name="description"]', 'content', pageDesc);
    setMeta('link[rel="canonical"]', 'href', SITE + '/catalog/' + section[0] + '/');
    setMeta('meta[property="og:title"]', 'content', pageTitle);
    setMeta('meta[property="og:description"]', 'content', pageDesc);
    titleEl.textContent = seo?.h1 || (section[1] + ' - формы для тротуарной плитки');
    introEl.textContent = 'В разделе «' + section[1] + '» показаны ' + count + ' позиций из прайс-листа FORMASUPER: артикулы, размеры, количество на м2, цены за штуку и фото по артикулам.';
    addSchema(section, seo);
    const article = seo?.text ? '<article class="section-seo-copy"><h2>Описание серии</h2>' + paragraphs(seo.text) + '<div class="section-cta"><button data-open-lead>Получить расчет</button><a class="primary-link" href="https://disk.yandex.ru/i/_i_RJJr7k8tDvA" target="_blank" rel="noopener">Скачать каталог</a></div></article>' : '';
    const table = '<article class="catalog-section"><h2>Цены и артикулы ' + e(section[1]) + '</h2><div class="seo-table-wrap"><table class="seo-product-table"><thead><tr><th>Фото</th><th>Артикул</th><th>Наименование</th><th>Размер</th><th>шт/м2</th><th>Цена</th><th></th></tr></thead><tbody>' + section[2].map(row).join('') + '</tbody></table></div></article>';
    root.innerHTML = article + table + faqHtml(seo?.faq || []);
    bindLead(root);
  } catch (error) {
    root.innerHTML = '<p class="form-note">Каталог временно не загрузился. Обновите страницу через минуту.</p>';
  }
}

init();
