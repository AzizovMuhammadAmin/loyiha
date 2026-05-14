const initialData = [
  {
    id: 1,
    name: "Yog' filtri",
    type: "filter",
    price: "85,000 UZS",
    brand: "GM Original",
    status: "Mavjud",
    img: "https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24?w=400&h=200&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Tormoz balatalari",
    type: "brake",
    price: "220,000 UZS",
    brand: "GM Original",
    status: "Mavjud",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Spark Plug (Svecha)",
    type: "engine",
    price: "45,000 UZS",
    brand: "GM Original",
    status: "Mavjud",
    img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=200&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Kuzov eshigi (Radnoy)",
    type: "original",
    price: "1,200,000 UZS",
    brand: "GM Original",
    status: "Mavjud",
    img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=200&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Amortizator purjinasi",
    type: "suspension",
    price: "450,000 UZS",
    brand: "GM Original",
    status: "Mavjud",
    img: "https://images.unsplash.com/photo-1621252110207-640428385437?w=400&h=200&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Gentra Old Fara",
    type: "original",
    price: "950,000 UZS",
    brand: "GM Original",
    status: "Mavjud",
    img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=200&fit=crop&q=80"
  }
];

// Load data from localStorage
let data = JSON.parse(localStorage.getItem('gm_products')) || initialData;

// Fix missing IDs in localStorage data
data = data.map((item, index) => {
    if (!item.id) {
        return { ...item, id: index + 1 };
    }
    return item;
});
localStorage.setItem('gm_products', JSON.stringify(data));

const typeLabels = {
  filter: "Filtr",
  brake: "Tormoz",
  engine: "Dvigatel",
  suspension: "Hadavoy qism",
  original: "Radnoy detallar",
  accessories: "Bezklar"
};

const container = document.getElementById("cards");
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".nav");

// --- SHOPPING CART LOGIC ---
let cart = JSON.parse(localStorage.getItem('gm_cart')) || [];

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotalSum = document.getElementById('cartTotalSum');
    
    cartBadge.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Savatchangiz hozircha bo\'sh.</p>';
        cartTotalSum.textContent = '0 UZS';
    } else {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const priceNum = parseInt(item.price.replace(/\D/g, '')) || 0;
            total += priceNum;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.img || 'images/logo.png'}" class="cart-item__img" onerror="this.src='images/logo.png'">
                <div class="cart-item__info">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                </div>
                <button class="cart-item__remove" onclick="removeFromCart(${index})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        cartTotalSum.textContent = total.toLocaleString() + ' UZS';
    }
    
    localStorage.setItem('gm_cart', JSON.stringify(cart));
}

window.addToCart = (id) => {
    const product = data.find(p => p.id === id);
    if (product) {
        cart.push({...product});
        updateCartUI();
        
        // Visual feedback on button
        const btn = document.querySelector(`[data-id="${id}"]`);
        if(btn) {
            btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
            btn.style.background = '#00c37a';
            setTimeout(() => {
                btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
                btn.style.background = '';
            }, 1000);
        }
    }
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartUI();
};

// Render function
function render(type = "all") {
  // Always get fresh data from localStorage
  data = JSON.parse(localStorage.getItem('gm_products')) || initialData;
  const filtered = data.filter(item => type === "all" || item.type === type);

  // Fade out
  container.style.opacity = "0";
  container.style.transform = "translateY(10px)";

  setTimeout(() => {
    container.innerHTML = "";

    if (filtered.length === 0) {
        container.innerHTML = `<p style="text-align: center; grid-column: 1/-1; padding: 40px; color: var(--color-text-muted);">Mahsulotlar topilmadi.</p>`;
    }

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${item.img || 'images/logo.png'}" alt="${item.name}" loading="lazy" onerror="this.src='images/logo.png'">
        <div class="type">${typeLabels[item.type] || item.type}</div>
        <div class="title">${item.name}</div>
        <div class="malumot">
          <span>${item.status}</span>
          <span>${item.brand}</span>
        </div>
        <div class="price">${item.price}</div>
        <button class="add-to-cart-btn" data-id="${item.id}" onclick="addToCart(${item.id})" aria-label="Savatchaga qo'shish">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      `;

      container.appendChild(card);
    });

    // Fade in
    container.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    container.style.opacity = "1";
    container.style.transform = "translateY(0)";
  }, 180);
}

// Initial render
render();
updateCartUI();

// Tabs
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.type);
  });
});

// Header Dropdown click handling
document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", (e) => {
    const type = item.dataset.type;
    
    // Update tabs active state
    document.querySelectorAll(".tab").forEach(tab => {
      if (tab.dataset.type === type) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    // Render filtered products
    render(type);

    // Smooth scroll to parts section
    const partsSection = document.getElementById("parts");
    if (partsSection) {
      partsSection.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile menu if open
    if (window.innerWidth <= 768) {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Dropdown Toggle (Desktop & Mobile)
const dropdownItem = document.querySelector('.nav__item--dropdown');
const dropdownLink = document.querySelector('.nav__item--dropdown .nav__link');

if (dropdownLink && dropdownItem) {
  dropdownLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Sahifani silliq pastga aylantirish
    const partsSection = document.getElementById("parts");
    if (partsSection) {
      partsSection.scrollIntoView({ behavior: "smooth" });
    }
    
    // Mobil versiyada menyuni yopish
    if (window.innerWidth <= 768) {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (dropdownItem && !dropdownItem.contains(e.target)) {
    dropdownItem.classList.remove('is-open');
    dropdownItem.classList.remove('mobile-active');
  }
});

// Header scroll effect
const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Scroll to top button
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    topBtn.classList.add("visible");
  } else {
    topBtn.classList.remove("visible");
  }
});

topBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// --- MODAL LOGIC (LOGIN, SHOP, CART) ---
const modals = [
    { btn: "loginBtn", modal: "loginModal", close: "closeModal", overlay: "modalOverlay" },
    { btn: "seeAllBtn", modal: "shopModal", close: "closeShopModal", overlay: "shopModalOverlay" },
    { btn: "cartBtn", modal: "cartModal", close: "closeCartModal", overlay: "cartModalOverlay" }
];

modals.forEach(m => {
    const btn = document.getElementById(m.btn);
    const modal = document.getElementById(m.modal);
    const close = document.getElementById(m.close);
    const overlay = document.getElementById(m.overlay);

    if (btn && modal) {
        const toggle = () => {
            modal.classList.toggle('active');
            document.body.style.overflow = modal.classList.contains('active') ? 'hidden' : '';
        };

        if (m.btn === 'loginBtn') {
            // Special handling for login button: toggle login/logout OR open modal
            btn.addEventListener('click', () => {
                const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
                if (isLoggedIn) {
                    // Logout
                    localStorage.removeItem('loggedIn');
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('userPhone');
                    localStorage.removeItem('userAvatar');
                    refreshLoginButton();
                } else {
                    // Open modal
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
            // Close buttons should ONLY close, not trigger login logic
            if (close) close.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
            if (overlay) overlay.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        } else {
            // Normal toggle for other modals
            btn.addEventListener('click', toggle);
            if (close) close.addEventListener('click', toggle);
            if (overlay) overlay.addEventListener('click', toggle);
        }
    }
});

// Close on Escape
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach(modal => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    });
  }
});

// Order button logic
document.getElementById('orderBtn').addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!isLoggedIn) {
        // Open login modal if not logged in
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        return;
    }
    if (cart.length === 0) {
        alert("Savatchangiz bo'sh!");
        return;
    }
    alert("Buyurtmangiz qabul qilindi! Tezz orada operatorimiz siz bilan bog'lanadi.");
    cart = [];
    updateCartUI();
    document.getElementById('cartModal').classList.remove('active');
    document.body.style.overflow = "";
});

        // Login form handling
        const loginForm = document.querySelector('#loginModal .modal__form');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = document.getElementById('email');
                const phoneInput = document.getElementById('phone');
                const email = emailInput ? emailInput.value.trim() : '';
                const phone = phoneInput ? phoneInput.value.trim() : '';
                
                // Store login state and info
                localStorage.setItem('loggedIn', 'true');
                if (email) localStorage.setItem('userEmail', email);
                if (phone) localStorage.setItem('userPhone', phone);

                // Add to persistent user list for Admin view
                let users = JSON.parse(localStorage.getItem('gm_users')) || [];
                const userExists = users.some(u => u.email === email || u.phone === phone);
                if (!userExists && (email || phone)) {
                    users.push({
                        email: email || 'Noma\'lum',
                        phone: phone || 'Noma\'lum',
                        date: new Date().toLocaleString()
                    });
                    localStorage.setItem('gm_users', JSON.stringify(users));
                }

                refreshLoginButton();

                // Close login modal
                const loginModal = document.getElementById('loginModal');
                if (loginModal) {
                    loginModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

// Update login button on page load if already logged in
function refreshLoginButton() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const loginBtn = document.getElementById('loginBtn');
    if (isLoggedIn) {
        if (loginBtn) {
            loginBtn.textContent = 'Chiqish';
            loginBtn.classList.add('logged-in');
        }
    } else {
        if (loginBtn) {
            loginBtn.textContent = 'Kirish';
            loginBtn.classList.remove('logged-in');
        }
    }
}
refreshLoginButton();

// --- THEME TOGGLE LOGIC ---
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

const getTheme = () => localStorage.getItem("theme") || "light";

const setTheme = (theme) => {
  htmlElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  });
}

// --- MOBILE MENU LOGIC ---
if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
  });

  // Close menu on link click
  nav.querySelectorAll(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// --- HERO SLIDER LOGIC ---
const slider = document.getElementById("heroSlider");
if (slider) {
  const slides = slider.querySelectorAll(".hero__slide");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const dotsContainer = document.getElementById("sliderDots");
  let currentSlide = 0;
  let autoSlideInterval;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetAutoSlide(); });

  startAutoSlide();
}
