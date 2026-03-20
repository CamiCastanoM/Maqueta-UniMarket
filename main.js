/* ================================================
   main.js — UniMarket Universidad del Magdalena
   ================================================ */

// ==================== VIEW SWITCHING ====================
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + name);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Si la vista es la búsqueda móvil, hacemos focus automático en el input
    if(name === 'search') {
      setTimeout(() => {
        const searchInput = document.getElementById('mobile-search-input');
        if(searchInput) searchInput.focus();
      }, 100);
    }
  }
}

// ==================== INYECTAR DATOS EN VISTA DETALLE ====================
function verProducto(cardElement) {
  const title = cardElement.querySelector('.card-title').textContent;
  const imgSrc = cardElement.querySelector('.card-img').src;
  
  const priceNode = cardElement.querySelector('.card-price').childNodes[0];
  const price = priceNode ? priceNode.nodeValue.trim() : "$0";
  
  let seller = cardElement.querySelector('.card-seller').textContent;
  seller = seller.replace(/🌟|📚|💻|📓|🍕|🛍️/g, '').trim();

  document.getElementById('detail-title').textContent = title;
  document.getElementById('detail-price').textContent = price;
  document.getElementById('main-gallery-img').src = imgSrc;
  document.getElementById('detail-seller').textContent = seller;
  document.getElementById('breadcrumb-product-name').textContent = title;
  
  showView('product');
}

// ==================== CATEGORY PILLS (FILTROS) ====================
function initCatPills() {
  document.querySelectorAll('.cat-pills').forEach(container => {
    container.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', function () {
        container.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        this.classList.add('active');

        const targetCat = this.getAttribute('data-target');
        const view = this.closest('.view');
        
        if (view) {
          let count = 0;
          const cards = view.querySelectorAll('.product-card');
          
          cards.forEach(card => {
            const cardCat = card.getAttribute('data-cat');
            if (targetCat === 'all' || cardCat === targetCat) {
              card.style.display = 'block';
              count++;
              card.style.animation = 'none';
              setTimeout(() => card.style.animation = 'fadeIn 0.35s ease both', 10);
            } else {
              card.style.display = 'none';
            }
          });

          const countText = view.querySelector('#resultados-count');
          if(countText) countText.textContent = `Mostrando ${count} resultados`;
        }
      });
    });
  });
}

// ==================== MORE TABS (EXPANDIR OPCIONES) ====================
function initMoreTabs() {
  document.querySelectorAll('.more-tabs').forEach(tabBar => {
    tabBar.querySelectorAll('.more-tab').forEach(tab => {
      tab.addEventListener('click', function () {
        tabBar.querySelectorAll('.more-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const targetCat = this.getAttribute('data-target');
        const grid = document.getElementById('mini-productos-grid');
        
        if(grid) {
          grid.querySelectorAll('.mini-card').forEach(card => {
            const cardCat = card.getAttribute('data-cat');
            if (targetCat === 'all' || cardCat === targetCat) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  });
}

// ==================== GALLERY THUMBS ====================
function changeImg(thumb, src) {
  const mainImg = document.getElementById('main-gallery-img');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

// ==================== COUNTDOWN TIMER ====================
let totalSeconds = 2 * 3600 + 14 * 60 + 32;

function updateTimer() {
  if (totalSeconds <= 0) totalSeconds = 3 * 3600;

  const h   = Math.floor(totalSeconds / 3600);
  const m   = Math.floor((totalSeconds % 3600) / 60);
  const s   = totalSeconds % 60;
  const fmt = n => String(n).padStart(2, '0');

  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (hoursEl)   hoursEl.textContent   = fmt(h);
  if (minutesEl) minutesEl.textContent = fmt(m);
  if (secondsEl) secondsEl.textContent = fmt(s);

  totalSeconds--;
}

function initCountdown() {
  updateTimer();
  setInterval(updateTimer, 1000);
}

// ==================== STORE FILTER ITEMS ====================
function initFilterItems() {
  document.querySelectorAll('.filter-item').forEach(item => {
    item.addEventListener('click', function () {
      const sidebar = this.closest('.store-sidebar');
      if (sidebar) {
        sidebar.querySelectorAll('.filter-item').forEach(fi => {
          fi.style.background = '';
          fi.style.color = '';
        });
      }
      this.style.background = 'var(--gray-100)';
      this.style.color = 'var(--primary)';
    });
  });
}

// ==================== MOBILE NAV ====================
function setMobileActive(el) {
  document.querySelectorAll('.mobile-nav li').forEach(li => li.classList.remove('active'));
  el.classList.add('active');
}

function toggleMobileMenu() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== FAV BUTTON ====================
function initFavButtons() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      this.textContent = this.textContent.trim() === '🤍' ? '❤️' : '🤍';
    });
  });
}

// ==================== PUBLISH FORM PREVIEW ====================
function initPublishPreview() {
  const titleInput = document.getElementById('pub-title');
  const priceInput = document.getElementById('pub-price');
  const previewTitle = document.getElementById('prev-title');
  const previewPrice = document.getElementById('prev-price');

  if (titleInput && previewTitle) {
    titleInput.addEventListener('input', function () {
      previewTitle.textContent = this.value || 'Título del producto';
    });
  }

  if (priceInput && previewPrice) {
    priceInput.addEventListener('input', function () {
      const val = parseInt(this.value, 10);
      previewPrice.textContent = val ? '$' + val.toLocaleString('es-CO') : '$0';
    });
  }
}

// ==================== PUBLISH STEPS ====================
function initPublishSteps() {
  const steps = document.querySelectorAll('.step-item');
  steps.forEach((step, i) => {
    step.addEventListener('click', function () {
      steps.forEach(s => s.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  initCatPills();
  initCountdown();
  initMoreTabs();
  initFilterItems();
  initFavButtons();
  initPublishPreview();
  initPublishSteps();
});
