const leadDialog = document.getElementById('leadDialog') || document.getElementById('lead');
const leadForm = document.getElementById('leadForm');

const IMAGE_INDEX = {
  '47.1':'1Hdy8n3OG7YSqtR2QarHAMPzw_wGQm7rE','49.1':'1__MKPTkyoYe82ORwK2kFjfCFnLGUCBPq','49.2':'1q5KdIM6ucd1HuzcT2y33enH4dLuHyMEX','49.2.1':'1q5KdIM6ucd1HuzcT2y33enH4dLuHyMEX','49.4':'1zaNtfkVb3KkhvTH0qG0T1tsemJkKjzrE','71.18':'1__jNmYgIDIlYKNFrNGovQ-O8L88fRO8z','73.0':'1GUJwW_Xk36ZBeDxWtipHH7mIwMtzp7_1','82.0':'1Mdmg54mvu5QUPxwC4U7_zEudoGx4iO49','82.0.1':'13gJq7n9Z2oQEg6B5ZM8CYj7GOhcCK71s','82.4':'1NkVRMRw0OQZeAuJHAT9L43wroXvkVOZu','82.4.1':'1C1qbPVRYmjsVEgq7N1XCFVMszeIuzFO0','92.1A':'1O7Kqvc4xzF1Tx9Jd9HmW4R-ZSZC8s0NT','92.1B':'1N3KA68axrT4uqkcSN6XGATigU1_zOp8W','92.2A':'1cbtSpMU_CxKweRZRkJslfUqHdQ--dLg3','92.2B':'1mS_Hr_1AT6_q_axZSvF3RC1QQWu0JVUs','92.2C':'1lDerIbBxseUsjgICx4ZTrJscaMjLcW8F',
  '101':'1hFOn4yusZD-i_Jb_g0G5mrvfeaX-JvOM','104':'1AbK9GVMJBITKj8J1fBFtzeC6J3oIwSk_','105':'1fKi0Fj5y7ND5LWDHaB00uMggaIJUKDLx','106':'1e7W74ejTo4aCQaf1Ml5UKdjP3T9bC8GO','108':'1Dt1pGgOWMdhpQY_LTzXEo8Z0SvwSsss8','110':'1AherJGbIjo5-4uhqYaRXfgz17W6nQYp8','111':'1cCq1O-Zzzrq6Yle5BdVRzLAgu7zvXDi8','112':'1LvqjdI6shVSmlFHxMK8-yjPj5EYHjmjh','113':'17rnWhkc0ZCf1iDB2ww3RoeSuQSJxiU-D','114':'1k2l6oSU0CnEM3W8Luq_A_yjly0Nck3e9','115':'13pv6_pmJN0bgRN-98ik8W1q5NapC08Tz','116':'1pcr-8wyYjc0fuw4ZsifHtXwlZ9vUhbi5','117':'1Cx76_qKD3JPSxBlFb9lwdm81ThL2BoFP','118':'1xtAK6ohT_Pwk_Yfzr6s85Iu81YJWBMkw','119':'1T9kRKMTOW_BW7ORCqrjB0-DxSwRm10Bb','120':'1bMRAU4g2YEhHAKmGXBem4pJeGywYitLN','127':'1Ma4grpzp6dwLQGox3n_-JpOeSGhX_qpz','129':'1LrnKBnuLU0XwDvQf-IR8C1HSPKwWv3qt','130':'1nNow2jBKbbgnENxsOE4QTg681R-5Zwkw','132':'139oHi0KwUOlzf9mcowXIqr5NPXxqslzG','133':'1w-ugLKlHA5YqTN1JNr7YYnpEMJpbEgul','135':'1UWAj2YKGguopRDncqOZBFPtrvc-zUlwl','136':'1S_QeXrXi3o24isuTKK83jctghmmK8ETZ','138':'1wtfHwDmKhSL2p6ls0PiiSjfy9CXwsZe-','141.1':'1JHoz47PHG1ElvowEle3e0yRKJv0pBdCI','142.2':'1t3qgmNhy7LbKhvGJ8mJySaq_4MDnibJw','143':'1ggbbXS3Fkm8g5OoBKlBbt-CEAkXtuX4o','143.1':'12Up6J6Cpyn1ieZ5EqWj_nctwxC7L9dlP','143.2':'1oii9lxVxqllCYrp6zt1n72N84pKYSjGj','144':'1Apk-9po7YnoNvDgUBIFYl1RD7HIoElak','147':'1ZirJSOQ22SUsLIBYnM7B2i2lYcF6tlxY','148':'1GDzlsx4ANYXjEdYM1VPolqPYPPp5Ray6','149':'1LFgjWaSVJhfFSbdso_OCvQc3UoQtIiFg','153':'1KBMl1CCCLyPSbb1IzbyyfzQinALwOzf0','156':'1KmGbZkkKKS_scboKj3rJWYUVZU2SjYsA','160':'10gDjBK5tQ92lT2jVF21w3jUoKIOuggy4','166':'1FCFQTm5YcnNGX_vhwxiQYCO-vKdZQRUz','167':'1egfqVATX1kAyz00KMiRPVXmYzdDqMJJX','168':'15Edu4denIQj9-3B5iERptuZ4IJH2fVeF','169.1':'1a4RD7bkDC80DM0rAjlek_btK92POBqt5','170':'1UoKB4gJc3-1D4WIQXYxXjuOTtmGkpDLk','171':'1W5q9nFlvN6ma-Gh69MB04m1hvD2-7zPT','175':'16Ljc9qyk7L-Y8BpabUG8G45IWJqNuWPb','176':'1etU7Dox7L6xZB-E3icr_St5A9OyTO5hX','180':'1y4LiOHvWjkR-1yfiurSU2v0H1o5dTKri','181':'1qY9Dbvbz3FozxRjV4Gmbtd7RB6IaUxdK','182':'150S56z9IDjVUyvIUPVvlw34VIAio1oEC','186':'1USOuk7iOkBj-FgDVBM6Fi1yXcPgBTJaQ','197':'15ufdSI7X6II4rPupaHi7eJcIK5thnaeM','199':'12-xb6t2JScCFzanQWwZ9neIYxZ5NakxE',
  '201':'1oL5hG3e4a972cNs6SllY8GhGSM5slYuj','202':'1O3r8qQ8Ztzid-nwtB6HiAHXa1vaOI_i8','203':'11zW7rq93pEV8DydkYkSewA-jSrW2-AT0','203.1':'1CCs44LZmX8dm9ilBRO1XyJGT-37P1fDi','203.2':'1-MDpxVsgBJ4ohplSVLSDTYnDwVYs2QRB','205':'15khzJdr7C6avhR4oiVb0VKE1g-T9X4lE','206.1':'1Bcq2Ph1v8RDE3x86AlicetktrnosKQmY','206.2':'1y8VhcVPNyFNR8F19gt7jKt6TErvfGIz1','208':'1bXxFK_9o5N-4Y3WdoO9iPX12aiBR61Lk','209':'1oaq2ZpALceUX6njqha7fLCf5kLGo5WFL','210':'1P3RdHBuNq1XsU_RbiC2st3UaYft1Vb91','212':'1RBTIxZzqQG7rZy8CxtneyzDmbmJjiX1p','213':'1xcCZD4WXvu6SdZZLbdSNnQQSdYmwRgTb','215':'1k_E6AdK863wrtH7VozPhH0r7xrw4Veds','217':'1hpm2qv6wZw4Xv_Ipp5CQWthe3gUbOnPe','218':'1LnZ-vGo1GYyMW8-M0DT0R67e70fmM6xw','219':'1A4w4-entPaCsYkl8it4WTuxk4wylNzwh','220':'179I-8-KnkxkxIeS68QBmeBR4ZH3dCbZL','221':'1ZO4yp7sb-0K-LLzSy4kekvfTimS7FAmE','222':'1WBDgItavGOfZiK7zDrP5S14MFJpGvxtJ','223':'15u7bP8Ue-ttZlZipXB8XTLKgeVHOx2S-','224':'1u1xmPW5whjs69mIwLevrHRZgAZWuEENV','225':'1obJY-u62hZMleliU6eaZFzW2GCrv5mGo','227':'141kQYuW2ensKWzX-2sguBILqX1tj30sJ','230':'1gFepW-k3PZjRWgM9-es5Fr8aC5hGIUq7','232':'1ZQZrrEGYXKGJeQkm-3O5e12-gDfigKDq','233':'1Zg4akxfjD59IcLBQfx-sVI3CGtwcVPI2','234':'1PZYGK6q42rxSOIEARhROBV9CahFixxNt','235':'1AQueb3Tc35UKFP2m-uajdKwio3GMiKcx','238':'16kARirWZOmUkwD6mxI3NEkLklLJHeYQy','240':'1oMSF404aaN2EueoAWtlTDIDdnkX09Y_t','242':'1AoL0VdYUv7ztMwlC4la-EHqwTGrBPDPc','243':'1OOjLTslcTyAlDRi9G-hdE0CISx96fOLk'
};

function openLead(product) {
  if (product && leadForm?.elements.message && !leadForm.elements.message.value) {
    leadForm.elements.message.value = `Интересует товар: ${product}. `;
  }
  leadDialog?.showModal?.();
}

function bindLeadButtons(scope = document) {
  scope.querySelectorAll('[data-open-lead]').forEach((button) => {
    if (button.dataset.boundLead) return;
    button.dataset.boundLead = '1';
    button.addEventListener('click', () => openLead(button.dataset.product));
  });
}

bindLeadButtons();

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(leadForm).entries());
  const text = ['Новая заявка с сайта формаподплитку.рф', `Имя: ${data.name || ''}`, `Телефон: ${data.phone || ''}`, `Мессенджер: ${data.messenger || ''} ${data.messengerOther || ''}`, `Комментарий: ${data.message || ''}`].join('\n');
  window.location.href = `mailto:formasuper@bk.ru?subject=${encodeURIComponent('Заявка с сайта')}&body=${encodeURIComponent(text)}`;
  leadDialog?.close?.();
});

function normalizeKey(value) {
  return String(value ?? '')
    .trim()
    .replace(/[Аа]/g, 'A')
    .replace(/[Вв]/g, 'B')
    .replace(/[Сс]/g, 'C')
    .replace(/[\\/]/g, '.')
    .replace(/\s+/g, ' ')
    .toUpperCase();
}

function resolveImage(article) {
  const key = normalizeKey(article);
  const base = key.split('.')[0];
  const id = IMAGE_INDEX[key] || IMAGE_INDEX[base] || Object.entries(IMAGE_INDEX).find(([candidate]) => candidate.startsWith(`${key}.`))?.[1];
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w800` : '';
}

function normalizeCatalog(source) {
  const sections = source.sections || [];
  return sections.map((section) => {
    if (Array.isArray(section)) {
      return {
        id: section[0],
        name: section[1],
        products: (section[2] || []).map((item) => ({
          article: item[0],
          name: item[1],
          size: item[2],
          perM2: item[3],
          price: item[4],
          image: item[5] || resolveImage(item[0]),
        })),
      };
    }
    return section;
  });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

async function renderCatalog() {
  const root = document.getElementById('catalogRoot');
  if (!root) return;

  let catalog;
  try {
    const response = await fetch('/data/catalog.json', { cache: 'no-store' });
    catalog = normalizeCatalog(await response.json());
  } catch (error) {
    root.innerHTML = '<p class="form-note">Каталог временно не загрузился. Обновите страницу через минуту.</p>';
    return;
  }

  const search = document.getElementById('catalogSearch');
  const filter = document.getElementById('sectionFilter');

  const render = () => {
    const query = (search?.value || '').toLowerCase().trim();
    const sectionId = filter?.value || '';
    const html = catalog.map((section) => {
      if (sectionId && section.id !== sectionId) return '';
      const products = (section.products || []).filter((product) => {
        const haystack = [product.article, product.name, product.size, product.price].join(' ').toLowerCase();
        return !query || haystack.includes(query);
      });
      if (!products.length) return '';
      return `<article class="catalog-section" id="${escapeHtml(section.id)}"><h2>${escapeHtml(section.name)}</h2><div class="product-grid">${products.map((product) => `<article class="product-card"><div class="product-image">${product.image ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">` : '<span>Фото</span>'}</div><div class="body"><div class="product-meta">Артикул ${escapeHtml(product.article)}</div><h3>${escapeHtml(product.name)}</h3><div class="product-meta">Габариты: ${escapeHtml(product.size || 'уточняются')} · шт/м2: ${escapeHtml(product.perM2 || '-')}</div><div class="product-price">${escapeHtml(product.price)} ₽/шт</div><button data-open-lead data-product="${escapeHtml(product.article)}">Заказать</button></div></article>`).join('')}</div></article>`;
    }).join('');
    root.innerHTML = html || '<p class="form-note">По этому запросу ничего не найдено.</p>';
    bindLeadButtons(root);
  };

  search?.addEventListener('input', render);
  filter?.addEventListener('change', render);
  render();
}

renderCatalog();

const stage = document.getElementById('tileStage');
stage?.addEventListener('pointermove', (event) => {
  const rect = stage.getBoundingClientRect();
  stage.style.setProperty('--mx', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(2));
  stage.style.setProperty('--my', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(2));
});
