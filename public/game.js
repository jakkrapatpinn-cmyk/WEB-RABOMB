/* =================================================================
   BIG W. GARAGE CO. — script.js  (single-page build)
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ── PRODUCT DATA ───────────────────────────────────────────── */
  const products = [
    {
      name: "Garlic Engine Bomber",
      desc: "Quilted satin body, gold zipper pull, numbered patch.",
      glyph: "🧄",
      world: "apparel",
      price: 268,
      lives: 3,
    },
    {
      name: "Plunder Crewneck",
      desc: "Heavyweight 16oz fleece, boxy cut, gold cuffs.",
      glyph: "💰",
      world: "apparel",
      price: 96,
      lives: 12,
    },
    {
      name: "Motor Garage Tee",
      desc: "Garment-dyed cotton, cracked-print graphic.",
      glyph: "🏍️",
      world: "apparel",
      price: 54,
      lives: 30,
    },
    {
      name: "Greed Cap",
      desc: "Structured 6-panel, embroidered side patch.",
      glyph: "🧢",
      world: "headwear",
      price: 58,
      lives: 9,
    },
    {
      name: "Heist Bucket Hat",
      desc: "Reversible canvas, UV-reactive underbrim.",
      glyph: "🎩",
      world: "headwear",
      price: 64,
      lives: 6,
    },
    {
      name: "Gold Coin Chain",
      desc: "Solid brass, hand-polished, 22in.",
      glyph: "🟡",
      world: "accessories",
      price: 128,
      lives: 4,
    },
    {
      name: "Treasure Pin Set",
      desc: "Five-piece hard enamel, gift box.",
      glyph: "💎",
      world: "accessories",
      price: 38,
      lives: 21,
    },
    {
      name: "Garlic Bulb Lamp",
      desc: "Resin-cast, dimmable, USB-C powered.",
      glyph: "🧄",
      world: "collectibles",
      price: 142,
      lives: 7,
    },
    {
      name: "Crate Coaster Set",
      desc: "Cork-backed ceramic, set of four.",
      glyph: "📦",
      world: "collectibles",
      price: 46,
      lives: 15,
    },
    {
      name: "Garage Keychain",
      desc: "Die-cast zinc alloy, antique gold finish.",
      glyph: "🔑",
      world: "collectibles",
      price: 24,
      lives: 40,
    },
    {
      name: "Backfire Hoodie",
      desc: "Garment-washed fleece, ribbed cuffs.",
      glyph: "💨",
      world: "apparel",
      price: 118,
      lives: 11,
    },
    {
      name: "Violet Garage Beanie",
      desc: "Merino rib-knit, tonal embroidery.",
      glyph: "🟣",
      world: "headwear",
      price: 42,
      lives: 18,
    },
  ];

  const worldLabels = {
    apparel: "Apparel",
    headwear: "Headwear",
    accessories: "Accessories",
    collectibles: "Collectibles",
  };

  /* ── RENDER CATALOG GRID ───────────────────────────────────── */
  const grid = document.getElementById("productGrid");
  const resultsCount = document.getElementById("resultsCount");
  const sortSelect = document.getElementById("sortSelect");
  let activeWorld = "all";

  function currentList() {
    return activeWorld === "all"
      ? [...products]
      : products.filter((p) => p.world === activeWorld);
  }

  function renderProducts(list) {
    if (!grid) return;
    grid.innerHTML = "";
    if (!list.length) {
      grid.innerHTML = `<div class="empty-state">No gear in this world yet. Check back next restock.</div>`;
      return;
    }
    list.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.style.animationDelay = `${i * 0.05}s`;
      card.innerHTML = `
        <div class="card-media">
          <span class="card-world">${worldLabels[p.world]}</span>
          <span class="card-lives">×${p.lives} LEFT</span>
          <span aria-hidden="true">${p.glyph}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${p.name}</h3>
          <p class="card-desc">${p.desc}</p>
          <div class="card-foot">
            <span class="card-price">$${p.price.toFixed(2)}</span>
            <button class="card-add" data-name="${p.name}" data-price="${p.price}">+ Add</button>
          </div>
        </div>`;
      grid.appendChild(card);
    });
    if (resultsCount)
      resultsCount.textContent = `${list.length} item${list.length !== 1 ? "s" : ""}`;
  }

  function applySortAndRender() {
    let list = currentList();
    const by = sortSelect ? sortSelect.value : "featured";
    if (by === "price-asc") list.sort((a, b) => a.price - b.price);
    if (by === "price-desc") list.sort((a, b) => b.price - a.price);
    if (by === "scarce") list.sort((a, b) => a.lives - b.lives);
    renderProducts(list);
  }

  applySortAndRender();
  sortSelect?.addEventListener("change", applySortAndRender);

  /* ── WORLD FILTER TABS ─────────────────────────────────────── */
  document.querySelectorAll(".world-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".world-tab").forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      activeWorld = tab.dataset.world;
      applySortAndRender();
    });
  });

  /* ── POWER METER (scroll progress bar) ─────────────────────── */
  const powerMeter = document.getElementById("powerMeter");
  function updatePowerMeter() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (powerMeter)
      powerMeter.style.width =
        docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : "0%";
  }
  window.addEventListener("scroll", updatePowerMeter, { passive: true });
  updatePowerMeter();

  /* ── SCROLL REVEAL ──────────────────────────────────────────── */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

  /* ── ACTIVE NAV LINK ON SCROLL ─────────────────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".primary-nav a");

  const navObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((a) => {
            a.classList.toggle(
              "nav-active",
              a.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    },
    { threshold: 0.25 },
  );
  sections.forEach((s) => navObs.observe(s));

  /* ── STICKY HEADER SHADOW ───────────────────────────────────── */
  const header = document.getElementById("siteHeader");
  window.addEventListener(
    "scroll",
    () => {
      if (header)
        header.style.boxShadow =
          window.scrollY > 20 ? "0 4px 0 rgba(23,11,31,0.1)" : "none";
    },
    { passive: true },
  );

  /* ── COUNTDOWN ──────────────────────────────────────────────── */
  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMins = document.getElementById("cd-mins");
  const cdSecs = document.getElementById("cd-secs");
  if (cdDays) {
    const target = new Date();
    target.setDate(target.getDate() + ((5 - target.getDay() + 7) % 7 || 7));
    target.setHours(9, 0, 0, 0);
    const pad = (n) => String(n).padStart(2, "0");
    function tick() {
      let d = Math.max(0, target - new Date());
      cdDays.textContent = pad(Math.floor(d / 86400000));
      d %= 86400000;
      cdHours.textContent = pad(Math.floor(d / 3600000));
      d %= 3600000;
      cdMins.textContent = pad(Math.floor(d / 60000));
      d %= 60000;
      cdSecs.textContent = pad(Math.floor(d / 1000));
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ── NOTIFY FORM ────────────────────────────────────────────── */
  const notifyForm = document.getElementById("notifyForm");
  const formStatus = document.getElementById("formStatus");
  notifyForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("notifyEmail").value;
    if (email && formStatus) {
      formStatus.textContent = `Locked in — we'll ping ${email} before the garage doors open.`;
      notifyForm.reset();
    }
  });

  /* ── CONTACT FORM ───────────────────────────────────────────── */
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (contactStatus)
      contactStatus.textContent =
        "Message received. The crew replies within one business day.";
    contactForm.reset();
  });

  /* ── FAQ ACCORDION ──────────────────────────────────────────── */
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-question")?.setAttribute(
          "aria-expanded",
          "false",
        );
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ── PRODUCT DETAIL: size + qty ─────────────────────────────── */
  document.querySelectorAll(".size-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      opt
        .closest(".size-options")
        ?.querySelectorAll(".size-option")
        .forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
    });
  });
  const qtyValue = document.getElementById("qtyValue");
  if (qtyValue) {
    document.getElementById("qtyMinus")?.addEventListener("click", () => {
      qtyValue.textContent = Math.max(
        1,
        parseInt(qtyValue.textContent, 10) - 1,
      );
    });
    document.getElementById("qtyPlus")?.addEventListener("click", () => {
      qtyValue.textContent = parseInt(qtyValue.textContent, 10) + 1;
    });
  }
  document.querySelectorAll(".gallery-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const main = document.querySelector(".gallery-main span");
      if (main) main.textContent = thumb.textContent;
    });
  });

  /* ── CART DRAWER ────────────────────────────────────────────── */
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const cartClose = document.getElementById("cartClose");
  const cartContinue = document.getElementById("cartContinue");
  const cartBtn = document.getElementById("cartBtn");
  const cartCountEl = document.getElementById("cartCount");
  const cartDrawerCount = document.getElementById("cartDrawerCount");
  const cartItemsEl = document.getElementById("cartItems");
  const cartEmptyEl = document.getElementById("cartEmpty");
  const cartFooterEl = document.getElementById("cartFooter");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const toast = document.getElementById("cartToast");

  // cart state: { id, name, glyph, price, qty }[]
  const cartState = [];
  let toastTimer;

  function openCart() {
    cartDrawer.classList.add("open");
    cartBackdrop.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartClose.focus();
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    cartBackdrop.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    cartBtn?.focus();
  }

  cartBtn?.addEventListener("click", openCart);
  cartClose?.addEventListener("click", closeCart);
  cartContinue?.addEventListener("click", closeCart);
  cartBackdrop?.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function renderCart() {
    const totalItems = cartState.reduce((s, i) => s + i.qty, 0);
    const subtotal = cartState.reduce((s, i) => s + i.price * i.qty, 0);

    if (cartCountEl) cartCountEl.textContent = totalItems;
    if (cartDrawerCount) cartDrawerCount.textContent = `(${totalItems})`;
    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    const isEmpty = cartState.length === 0;
    if (cartEmptyEl) cartEmptyEl.hidden = !isEmpty;
    if (cartFooterEl) cartFooterEl.hidden = isEmpty;

    // remove existing line items (not the empty state)
    cartItemsEl?.querySelectorAll(".cart-line").forEach((el) => el.remove());

    cartState.forEach((item) => {
      const line = document.createElement("div");
      line.className = "cart-line";
      line.dataset.id = item.id;
      line.innerHTML = `
        <div class="cart-line-glyph">${item.glyph}</div>
        <div class="cart-line-info">
          <p class="cart-line-name">${item.name}</p>
          <div class="cart-line-meta">
            <span class="cart-line-price">$${(item.price * item.qty).toFixed(2)}</span>
            <div class="cart-line-qty">
              <button aria-label="Decrease quantity" data-action="dec" data-id="${item.id}">−</button>
              <span>${item.qty}</span>
              <button aria-label="Increase quantity" data-action="inc" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
        <button class="cart-line-remove" aria-label="Remove ${item.name}" data-action="remove" data-id="${item.id}" title="Remove">✕</button>`;
      cartItemsEl?.appendChild(line);
    });
  }

  function addToCart(name, price, glyph = "📦") {
    const id = name.toLowerCase().replace(/\s+/g, "-");
    const existing = cartState.find((i) => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cartState.push({ id, name, glyph, price: parseFloat(price), qty: 1 });
    }
    renderCart();
    showToast(`Added: ${name}`);
  }

  // qty/remove controls inside drawer (event delegation)
  cartItemsEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const { action, id } = btn.dataset;
    const idx = cartState.findIndex((i) => i.id === id);
    if (idx === -1) return;

    if (action === "inc") {
      cartState[idx].qty++;
    } else if (action === "dec") {
      cartState[idx].qty--;
      if (cartState[idx].qty <= 0) cartState.splice(idx, 1);
    } else if (action === "remove") {
      cartState.splice(idx, 1);
    }
    renderCart();
  });

  // "add to cart" buttons throughout the page — grab glyph from nearest card
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".card-add, .add-to-cart");
    if (!btn) return;
    const card = btn.closest(".product-card, .featured-copy, .detail-copy");
    const glyph =
      card
        ?.querySelector(
          ".card-media span:last-child, .featured-glyph, .gallery-main span",
        )
        ?.textContent?.trim() || "📦";
    btn.style.transform = "scale(0.9)";
    setTimeout(() => (btn.style.transform = ""), 160);
    addToCart(btn.dataset.name, btn.dataset.price, glyph);
  });

  renderCart();
});
