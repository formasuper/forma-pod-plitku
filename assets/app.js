const leadDialog = document.getElementById('leadDialog') || document.getElementById('lead');
const leadForm = document.getElementById('leadForm');

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
  const text = [
    'Новая заявка с сайта формаподплитку.рф',
    `Имя: ${data.name || ''}`,
    `Телефон: ${data.phone || ''}`,
    `Мессенджер: ${data.messenger || ''} ${data.messengerOther || ''}`,
    `Комментарий: ${data.message || ''}`,
  ].join('\n');
  window.location.href = `mailto:formasuper@bk.ru?subject=${encodeURIComponent('Заявка с сайта')}&body=${encodeURIComponent(text)}`;
  leadDialog?.close?.();
});

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
          image: item[5] || '',
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
