(() => {
  'use strict';

  const WHATSAPP_NUMBER = '51999999999';
  const currency = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

  const products = [
    { id: 1, name: 'Laptop para estudio y oficina', category: 'computo', categoryLabel: 'Cómputo', icon: 'laptop', image: 'assets/laptop-real.webp', imageAlt: 'Laptop moderna sobre un escritorio', imagePosition: '50% 58%', tag: 'Recomendado', price: 1699, description: 'Equipo equilibrado para clases, documentos, videollamadas y trabajo diario.' },
    { id: 2, name: 'PC de escritorio optimizada', category: 'computo', categoryLabel: 'Cómputo', icon: 'monitor', image: 'assets/hero-real.webp', imageAlt: 'Estación de computadoras con iluminación tecnológica', imagePosition: '42% 50%', tag: 'Por pedido', price: 1890, description: 'Configuración personalizable con componentes seleccionados según tu uso.' },
    { id: 3, name: 'Unidad SSD 1 TB', category: 'componentes', categoryLabel: 'Componentes', icon: 'drive', image: 'assets/ssd-real.webp', imageAlt: 'Unidad de almacenamiento SSD M.2', imagePosition: '50% 50%', tag: 'Más velocidad', price: 279, description: 'Mejora el arranque, la apertura de programas y la respuesta general del equipo.' },
    { id: 4, name: 'Memoria RAM 16 GB', category: 'componentes', categoryLabel: 'Componentes', icon: 'cpu', image: 'assets/repair-real.webp', imageAlt: 'Componentes internos de una laptop durante su mantenimiento', imagePosition: '55% 62%', tag: 'Upgrade', price: 199, description: 'Más capacidad para multitarea, navegación y aplicaciones exigentes.' },
    { id: 5, name: 'Combo teclado y mouse', category: 'perifericos', categoryLabel: 'Periféricos', icon: 'box', image: 'assets/peripherals-real.webp', imageAlt: 'Teclado mecánico y mouse para computadora', imagePosition: '52% 52%', tag: 'Práctico', price: 89, description: 'Conjunto cómodo para oficina, hogar o centro de estudios.' },
    { id: 6, name: 'Audífonos con micrófono', category: 'perifericos', categoryLabel: 'Periféricos', icon: 'headset', image: 'assets/headset-real.webp', imageAlt: 'Audífonos y teclado en una estación de tecnología', imagePosition: '50% 34%', tag: 'Videollamadas', price: 119, description: 'Audio claro para clases, reuniones, juegos y atención al cliente.' },
    { id: 7, name: 'Router Wi-Fi doble banda', category: 'conectividad', categoryLabel: 'Conectividad', icon: 'wifi', image: 'assets/router-real.webp', imageAlt: 'Router inalámbrico moderno con cuatro antenas', imagePosition: '50% 53%', tag: 'Cobertura', price: 169, description: 'Conexión estable para varios dispositivos y mejor distribución de señal.' },
    { id: 8, name: 'Adaptador Wi-Fi USB', category: 'conectividad', categoryLabel: 'Conectividad', icon: 'wifi', image: 'assets/router-real.webp', imageAlt: 'Equipo de conectividad inalámbrica', imagePosition: '72% 46%', tag: 'Fácil instalación', price: 59, description: 'Añade o mejora la conectividad inalámbrica de una computadora.' },
    { id: 9, name: 'Monitor Full HD 24”', category: 'perifericos', categoryLabel: 'Periféricos', icon: 'monitor', image: 'assets/hero-real.webp', imageAlt: 'Monitores en una estación tecnológica', imagePosition: '20% 46%', tag: 'Productividad', price: 579, description: 'Área de trabajo amplia para oficina, estudio, programación y entretenimiento.' },
    { id: 10, name: 'Kit de mantenimiento PC', category: 'componentes', categoryLabel: 'Componentes', icon: 'wrench', image: 'assets/diagnostic-real.webp', imageAlt: 'Diagnóstico electrónico de componentes de computadora', imagePosition: '55% 52%', tag: 'Servicio', price: 79, description: 'Limpieza preventiva y revisión básica realizada por nuestro equipo técnico.' },
    { id: 11, name: 'Mini UPS para router', category: 'conectividad', categoryLabel: 'Conectividad', icon: 'shield', image: 'assets/router-real.webp', imageAlt: 'Router para conexión de red doméstica', imagePosition: '38% 54%', tag: 'Respaldo', price: 139, description: 'Mantiene la conexión de red ante interrupciones eléctricas breves.' },
    { id: 12, name: 'Webcam Full HD', category: 'perifericos', categoryLabel: 'Periféricos', icon: 'monitor', image: 'assets/laptop-real.webp', imageAlt: 'Laptop preparada para videollamadas y trabajo remoto', imagePosition: '54% 38%', tag: 'Clases y reuniones', price: 129, description: 'Imagen nítida para videollamadas, transmisiones y reuniones virtuales.' }
  ];

  const trackingData = {
    'CNX-1048': {
      customer: 'Cliente demostración',
      equipment: 'Laptop Lenovo',
      received: '20/07/2026',
      estimate: '22/07/2026',
      status: 'En reparación',
      stage: 3,
      note: 'Se autorizó el cambio de unidad de almacenamiento. El equipo se encuentra en pruebas de estabilidad.'
    },
    'CNX-2091': {
      customer: 'Cliente demostración',
      equipment: 'PC de escritorio',
      received: '19/07/2026',
      estimate: '21/07/2026',
      status: 'Listo para entregar',
      stage: 4,
      note: 'Mantenimiento completado. El equipo superó las pruebas de temperatura, arranque y conectividad.'
    },
    'CNX-3150': {
      customer: 'Cliente demostración',
      equipment: 'Laptop HP',
      received: '21/07/2026',
      estimate: 'Por confirmar',
      status: 'En diagnóstico',
      stage: 2,
      note: 'El equipo está siendo evaluado. Se enviará la cotización antes de realizar cualquier reparación.'
    }
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const state = {
    filter: 'all',
    query: '',
    cart: loadCart()
  };

  function getInitialTheme() {
    try {
      return localStorage.getItem('compunix-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }

  function applyTheme(theme, persist = true) {
    const selected = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = selected;
    const isDark = selected === 'dark';
    const toggle = $('#themeToggle');
    const label = isDark ? 'Activar modo claro' : 'Activar modo oscuro';
    toggle?.setAttribute('aria-label', label);
    toggle?.setAttribute('title', label);
    const labelNode = $('#themeToggleLabel');
    if (labelNode) labelNode.textContent = label;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    themeMeta?.setAttribute('content', isDark ? '#050b14' : '#f4f8fc');
    if (persist) {
      try { localStorage.setItem('compunix-theme', selected); } catch {}
    }
  }

  function loadCart() {
    try {
      const stored = JSON.parse(localStorage.getItem('compunix-cart') || '[]');
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem('compunix-cart', JSON.stringify(state.cart));
    } catch {
      // El carrito sigue funcionando durante la sesión aunque el navegador bloquee el almacenamiento.
    }
  }

  function iconMarkup(icon) {
    return `<svg class="icon"><use href="#i-${icon}"></use></svg>`;
  }

  function renderProducts() {
    const grid = $('#productGrid');
    const empty = $('#emptyProducts');
    if (!grid || !empty) return;

    const normalized = state.query.trim().toLowerCase();
    const filtered = products.filter(product => {
      const matchesCategory = state.filter === 'all' || product.category === state.filter;
      const haystack = `${product.name} ${product.description} ${product.categoryLabel}`.toLowerCase();
      return matchesCategory && haystack.includes(normalized);
    });

    grid.innerHTML = filtered.map(product => `
      <article class="product-card reveal visible">
        <div class="product-visual">
          <span class="product-tag">${product.tag}</span>
          <img src="${product.image}" alt="${product.imageAlt}" loading="lazy" decoding="async" style="object-position:${product.imagePosition || '50% 50%'}">
          <span class="product-image-shade" aria-hidden="true"></span>
        </div>
        <div class="product-info">
          <span class="product-category">${product.categoryLabel}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-footer">
            <div class="product-price"><small>Precio referencial</small><strong>${currency.format(product.price)}</strong></div>
            <button class="add-cart" type="button" data-add-cart="${product.id}" aria-label="Agregar ${product.name} al carrito">
              ${iconMarkup('bag')}
            </button>
          </div>
        </div>
      </article>
    `).join('');

    empty.hidden = filtered.length > 0;
    grid.hidden = filtered.length === 0;
  }

  function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) return;
    const existing = state.cart.find(item => item.id === productId);
    if (existing) existing.quantity += 1;
    else state.cart.push({ id: productId, quantity: 1 });
    saveCart();
    renderCart();
    showToast(`${product.name} agregado al carrito`);
  }

  function updateQuantity(productId, change) {
    const item = state.cart.find(cartItem => cartItem.id === productId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) state.cart = state.cart.filter(cartItem => cartItem.id !== productId);
    saveCart();
    renderCart();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
  }

  function renderCart() {
    const itemsContainer = $('#cartItems');
    const emptyCart = $('#emptyCart');
    const footer = $('#cartFooter');
    const count = $('#cartCount');
    const totalLabel = $('#cartTotal');
    if (!itemsContainer || !emptyCart || !footer || !count || !totalLabel) return;

    const detailedItems = state.cart.map(item => ({ ...item, product: products.find(product => product.id === item.id) })).filter(item => item.product);
    const totalQuantity = detailedItems.reduce((sum, item) => sum + item.quantity, 0);
    const total = detailedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    count.textContent = String(totalQuantity);
    itemsContainer.innerHTML = detailedItems.map(item => `
      <article class="cart-item">
        <div class="cart-thumb"><img src="${item.product.image}" alt="" loading="lazy" decoding="async"></div>
        <div>
          <h4>${item.product.name}</h4>
          <p>${currency.format(item.product.price)} c/u</p>
          <div class="cart-controls">
            <button class="qty-button" type="button" data-cart-action="decrease" data-product-id="${item.product.id}" aria-label="Restar unidad">${iconMarkup('minus')}</button>
            <span>${item.quantity}</span>
            <button class="qty-button" type="button" data-cart-action="increase" data-product-id="${item.product.id}" aria-label="Agregar unidad">${iconMarkup('plus')}</button>
          </div>
        </div>
        <button class="remove-item" type="button" data-cart-action="remove" data-product-id="${item.product.id}" aria-label="Eliminar producto">${iconMarkup('trash')}</button>
      </article>
    `).join('');

    emptyCart.hidden = detailedItems.length > 0;
    footer.hidden = detailedItems.length === 0;
    totalLabel.textContent = currency.format(total);
  }

  function openCart() {
    $('#cartDrawer')?.classList.add('open');
    $('#cartDrawer')?.setAttribute('aria-hidden', 'false');
    $('#drawerOverlay')?.classList.add('show');
    document.body.classList.add('no-scroll');
  }

  function closeCart() {
    $('#cartDrawer')?.classList.remove('open');
    $('#cartDrawer')?.setAttribute('aria-hidden', 'true');
    $('#drawerOverlay')?.classList.remove('show');
    document.body.classList.remove('no-scroll');
  }

  function sendCartToWhatsApp() {
    if (!state.cart.length) return;
    const lines = state.cart.map(item => {
      const product = products.find(productItem => productItem.id === item.id);
      return product ? `• ${item.quantity} x ${product.name} (${currency.format(product.price)} c/u)` : '';
    }).filter(Boolean);
    const total = state.cart.reduce((sum, item) => {
      const product = products.find(productItem => productItem.id === item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    const message = `Hola CompuNix, deseo consultar disponibilidad de estos productos:\n\n${lines.join('\n')}\n\nTotal referencial: ${currency.format(total)}\n\n¿Podrían confirmarme disponibilidad y precio final?`;
    openWhatsApp(message);
  }

  function openWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function renderTracking(code) {
    const result = $('#trackingResult');
    if (!result) return;
    const ticket = trackingData[code];
    if (!ticket) {
      result.innerHTML = `
        <div class="tracking-error">
          ${iconMarkup('search')}
          <h3>No encontramos ese código</h3>
          <p>Revisa que esté escrito correctamente o solicita ayuda por WhatsApp.</p>
          <a class="btn btn-secondary" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola CompuNix, necesito consultar el servicio ${code}`)}" target="_blank" rel="noopener">Consultar con un técnico</a>
        </div>`;
      return;
    }

    const stages = [
      ['Equipo recibido', 'Registro y verificación inicial'],
      ['Diagnóstico', 'Evaluación técnica y cotización'],
      ['Reparación y pruebas', 'Trabajo autorizado y comprobaciones'],
      ['Listo para entrega', 'Servicio finalizado']
    ];

    result.innerHTML = `
      <div class="ticket-head">
        <div><small>Código de servicio</small><h3>${code}</h3></div>
        <span class="ticket-status">${ticket.status}</span>
      </div>
      <div class="ticket-meta">
        <div><small>Equipo</small><strong>${ticket.equipment}</strong></div>
        <div><small>Recepción</small><strong>${ticket.received}</strong></div>
        <div><small>Cliente</small><strong>${ticket.customer}</strong></div>
        <div><small>Entrega estimada</small><strong>${ticket.estimate}</strong></div>
      </div>
      <div class="ticket-timeline">
        ${stages.map((stage, index) => `
          <div class="timeline-item ${index < ticket.stage ? 'done' : ''}">
            <span class="timeline-dot"></span>
            <div><strong>${stage[0]}</strong><small>${stage[1]}</small></div>
          </div>
        `).join('')}
      </div>
      <p class="ticket-note">${ticket.note}</p>
    `;
  }

  let toastTimer;
  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function openSupportModal() {
    const modal = $('#supportModal');
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setTimeout(() => $('input', modal)?.focus(), 100);
  }

  function closeSupportModal() {
    const modal = $('#supportModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  function initReveal() {
    const revealItems = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach(item => item.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.11, rootMargin: '0px 0px -40px' });
    revealItems.forEach(item => observer.observe(item));
  }

  function initEvents() {
    const header = $('.site-header');
    $('#themeToggle')?.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
    const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 14);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    const menuButton = $('#menuButton');
    const mainNav = $('#mainNav');
    menuButton?.addEventListener('click', () => {
      const isOpen = mainNav?.classList.toggle('open');
      menuButton.classList.toggle('active', Boolean(isOpen));
      menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
    });
    $$('#mainNav a').forEach(link => link.addEventListener('click', () => {
      mainNav?.classList.remove('open');
      menuButton?.classList.remove('active');
      menuButton?.setAttribute('aria-expanded', 'false');
    }));

    $('#productFilters')?.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      $$('.filter-pill', $('#productFilters')).forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      state.filter = button.dataset.filter;
      renderProducts();
    });

    $('#productSearch')?.addEventListener('input', event => {
      state.query = event.target.value;
      renderProducts();
    });

    $('#productGrid')?.addEventListener('click', event => {
      const button = event.target.closest('[data-add-cart]');
      if (!button) return;
      addToCart(Number(button.dataset.addCart));
    });

    $('#openCart')?.addEventListener('click', openCart);
    $('#closeCart')?.addEventListener('click', closeCart);
    $('#drawerOverlay')?.addEventListener('click', closeCart);
    $('#sendCart')?.addEventListener('click', sendCartToWhatsApp);

    $('#cartItems')?.addEventListener('click', event => {
      const button = event.target.closest('[data-cart-action]');
      if (!button) return;
      const id = Number(button.dataset.productId);
      const action = button.dataset.cartAction;
      if (action === 'increase') updateQuantity(id, 1);
      if (action === 'decrease') updateQuantity(id, -1);
      if (action === 'remove') removeFromCart(id);
    });

    $('#trackingForm')?.addEventListener('submit', event => {
      event.preventDefault();
      const code = String(new FormData(event.currentTarget).get('trackingCode') || '').trim().toUpperCase();
      if (!code) return;
      renderTracking(code);
    });

    $$('[data-demo-code]').forEach(button => button.addEventListener('click', () => {
      const code = button.dataset.demoCode;
      const input = $('#trackingCode');
      if (input) input.value = code;
      renderTracking(code);
    }));

    $('#faqList')?.addEventListener('click', event => {
      const button = event.target.closest('.faq-item button');
      if (!button) return;
      const item = button.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      $$('.faq-item', $('#faqList')).forEach(faq => {
        faq.classList.remove('open');
        $('button', faq)?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });

    $$('[data-open-support]').forEach(button => button.addEventListener('click', openSupportModal));
    $$('[data-close-support]').forEach(button => button.addEventListener('click', closeSupportModal));

    $$('[data-license]').forEach(button => button.addEventListener('click', () => {
      openWhatsApp(`Hola CompuNix, deseo información y cotización sobre una licencia de ${button.dataset.license}.`);
    }));

    $('#supportForm')?.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const message = `Hola CompuNix, deseo solicitar soporte remoto.\n\nNombre: ${data.get('name')}\nTipo de ayuda: ${data.get('service')}\nProblema: ${data.get('detail')}`;
      openWhatsApp(message);
      closeSupportModal();
      event.currentTarget.reset();
    });

    $('#contactForm')?.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const message = `Hola CompuNix, deseo realizar una consulta.\n\nNombre: ${data.get('name')}\nTeléfono: ${data.get('phone')}\nServicio: ${data.get('service')}\nMensaje: ${data.get('message')}`;
      openWhatsApp(message);
    });

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      closeCart();
      closeSupportModal();
      mainNav?.classList.remove('open');
      menuButton?.classList.remove('active');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  }

  function init() {
    applyTheme(getInitialTheme(), false);
    const year = $('#currentYear');
    if (year) year.textContent = new Date().getFullYear();
    renderProducts();
    renderCart();
    initReveal();
    initEvents();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
