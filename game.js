/* =================================================================
   BIG W. GARAGE CO. — script.js
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- PRODUCT DATA ---------------- */
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

  /* ---------------- RENDER GRID ---------------- */
  const grid = document.getElementById("productGrid");

  function renderProducts(list) {
    if (!grid) return;
    grid.innerHTML = "";

    if (list.length === 0) {
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
        </div>
      `;
      grid.appendChild(card);
    });
  }

  if (grid) renderProducts(products);

  /* ---------------- CATALOG SORT (catalog.html only) ---------------- */
  const sortSelect = document.getElementById("sortSelect");
  const resultsCount = document.getElementById("resultsCount");
  let activeWorld = "all";

  function currentList() {
    return activeWorld === "all"
      ? [...products]
      : products.filter((p) => p.world === activeWorld);
  }

  function applySortAndRender() {
    let list = currentList();
    const sortBy = sortSelect ? sortSelect.value : "featured";

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "scarce") list.sort((a, b) => a.lives - b.lives);

    renderProducts(list);
    if (resultsCount)
      resultsCount.textContent = `${list.length} item${list.length !== 1 ? "s" : ""}`;
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", applySortAndRender);
  }

  /* ---------------- WORLD FILTER TABS ---------------- */
  const tabs = document.querySelectorAll(".world-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      activeWorld = tab.dataset.world;
      applySortAndRender();
    });
  });
  if (tabs.length) applySortAndRender();

  /* ---------------- MOBILE NAV ---------------- */
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.classList.toggle("open");
      mobileNav.hidden = !isOpen;
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        mobileNav.hidden = true;
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- SCROLL: power meter + reveals ---------------- */
  const powerMeter = document.getElementById("powerMeter");
  function updatePowerMeter() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    powerMeter.style.width = `${pct}%`;
  }
  window.addEventListener("scroll", updatePowerMeter, { passive: true });
  updatePowerMeter();

  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------- COUNTDOWN ---------------- */
  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMins = document.getElementById("cd-mins");
  const cdSecs = document.getElementById("cd-secs");

  if (cdDays && cdHours && cdMins && cdSecs) {
    const target = new Date();
    target.setDate(target.getDate() + ((5 - target.getDay() + 7) % 7 || 7)); // next Friday
    target.setHours(9, 0, 0, 0);

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function tickCountdown() {
      const now = new Date();
      let diff = Math.max(0, target - now);

      const days = Math.floor(diff / 86400000);
      diff -= days * 86400000;
      const hours = Math.floor(diff / 3600000);
      diff -= hours * 3600000;
      const mins = Math.floor(diff / 60000);
      diff -= mins * 60000;
      const secs = Math.floor(diff / 1000);

      cdDays.textContent = pad(days);
      cdHours.textContent = pad(hours);
      cdMins.textContent = pad(mins);
      cdSecs.textContent = pad(secs);
    }
    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  /* ---------------- NOTIFY FORM ---------------- */
  const notifyForm = document.getElementById("notifyForm");
  const formStatus = document.getElementById("formStatus");

  if (notifyForm) {
    notifyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("notifyEmail").value;
      if (email) {
        formStatus.textContent = `You're on the list — we'll ping ${email} the moment the garage restocks.`;
        notifyForm.reset();
      }
    });
  }

  /* ---------------- CONTACT FORM (contact.html) ---------------- */
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactStatus.textContent =
        "Message received. The garage crew replies within one business day.";
      contactForm.reset();
    });
  }

  /* ---------------- FAQ ACCORDION (contact.html) ---------------- */
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-question")?.setAttribute(
          "aria-expanded",
          "false",
        );
      });
      if (!wasOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------------- PRODUCT DETAIL: size + quantity (product.html) ---------------- */
  document.querySelectorAll(".size-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      opt.parentElement
        .querySelectorAll(".size-option")
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

  /* ---------------- CART ---------------- */
  let cartCount = 0;
  const cartCountEl = document.getElementById("cartCount");
  const mobileCartCountEl = document.getElementById("mobileCartCount");
  const toast = document.getElementById("cartToast");
  let toastTimer;

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function addToCart(name, btn) {
    cartCount += 1;
    cartCountEl.textContent = cartCount;
    if (mobileCartCountEl)
      mobileCartCountEl.textContent = `${cartCount} item${cartCount !== 1 ? "s" : ""}`;
    showToast(`Added: ${name}`);

    if (btn) {
      btn.style.transform = "scale(0.92)";
      setTimeout(() => {
        btn.style.transform = "";
      }, 180);
    }
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".card-add, .add-to-cart");
    if (btn) {
      addToCart(btn.dataset.name, btn);
    }
  });

  /* ---------------- HEADER SCROLL SHADOW ---------------- */
  const header = document.getElementById("siteHeader");
  window.addEventListener(
    "scroll",
    () => {
      header.style.boxShadow =
        window.scrollY > 20 ? "0 4px 0 rgba(19,17,13,0.06)" : "none";
    },
    { passive: true },
  );
});
