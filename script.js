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

let typeLabels = {
  filter: "Filtr",
  brake: "Tormoz",
  engine: "Dvigatel",
  suspension: "Hadavoy qism",
  original: "Radnoy detallar",
  accessories: "Bezklar"
};

const translations = {
  uz: {
    nav_categories: "Kategoriyalar",
    nav_about: "Biz haqimizda",
    nav_help: "Yordam markazi",
    cat_all: "Hammasi",
    cat_engine: "Dvigatel qismlari",
    cat_suspension: "Hadavoy qism",
    cat_brake: "Tormoz tizimi",
    cat_filter: "Filtrlar",
    cat_original: "Radnoy detallar",
    cat_accessories: "Bezklar",
    nav_news: "Yangiliklar",
    nav_careers: "Karyera",
    nav_locations: "Manzillar",
    nav_faq: "FAQ",
    nav_contact: "Bog'lanish",
    nav_support: "Texnik yordam",
    login: "Kirish",
    logout: "Chiqish",
    hero_badge_1: "Original GM Parts",
    hero_title_1: "Dvigatel Qismlari",
    hero_subtitle_1: "Chevrolet avtomobillari uchun yuqori sifatli original dvigatel va agregat qismlari.",
    buy_now: "Sotib olish",
    catalog: "Katalog",
    hero_badge_2: "Chidamlilik",
    hero_title_2: "Hadavoy Qism",
    hero_subtitle_2: "Silliq va xavfsiz harakatlanish uchun purjina, amortizator va g'ildirak qismlari.",
    contact: "Bog'lanish",
    hero_badge_3: "Tezkor Yetkazib Berish",
    hero_title_3: "Kuzov Qismlari",
    hero_subtitle_3: "Fara, bamper va boshqa kuzov detallari shahar bo'ylab tezkor yetkazib berish bilan.",
    go_to_cart: "Savatchaga o'tish",
    all_parts: "Barcha qismlar",
    parts_label: "Ehtiyot qismlar",
    parts_title: "GM ehtiyot qismlarini tanlang",
    parts_subtitle: "Chevrolet avtomobillaringiz uchun yuqori sifatli ehtiyot qismlar",
    cat_engine_short: "Dvigatel",
    cat_suspension_short: "Hadavoy qism",
    cat_brake_short: "Tormoz",
    cat_filter_short: "Filtrlar",
    cat_original_short: "Radnoy detallar",
    cat_accessories_short: "Bezklar",
    shop_modal_title: "GM Online Shop",
    shop_modal_subtitle: "Barcha ehtiyot qismlar va aksessuarlar bir joyda",
    shop_cat_kuzov: "Kuzov qismlari",
    shop_cat_kuzov_desc: "Bamper, fara, eshiklar",
    shop_cat_engine: "Dvigatel",
    shop_cat_engine_desc: "Porshen, remen, svecha",
    shop_cat_elektr: "Elektr jihozlari",
    shop_cat_elektr_desc: "Akumulyator, datchiklar",
    shop_cat_service: "Xizmat ko'rsatish",
    shop_cat_service_desc: "Yog'lar, filtrlar, suyuqliklar",
    view_full_catalog: "To'liq katalogni ko'rish",
    features_badge: "Kafolat",
    features_title: "100% Original GM Ehtiyot Qismlari",
    features_desc: "Biz faqatgina Chevrolet zavodlaridan to'g'ridan-to'g'ri keltirilgan original mahsulotlarni sotamiz.",
    feature_1: "Sifat kafolati va original mahsulotlar",
    feature_2: "O'zbekiston bo'ylab tezkor yetkazib berish",
    feature_3: "Mutaxassisdan bepul texnik maslahat",
    learn_more: "Batafsil ma'lumot",
    footer_desc: "Chevrolet avtomobillari uchun original GM ehtiyot qismlari do'koni. Sifat va ishonch kafolati.",
    footer_main: "Asosiy",
    footer_orders: "Mening buyurtmalarim",
    footer_cart: "Savatcha",
    footer_profile: "Profil",
    footer_categories: "Kategoriyalar",
    cat_trans: "Transmissiya",
    footer_company: "Kompaniya",
    footer_about: "Biz haqimizda",
    footer_careers: "Karyera",
    footer_contact: "Aloqa",
    newsletter_title: "Newsletter",
    newsletter_desc: "Eng so'nggi yangiliklar va chegirmalardan xabardor bo'ling.",
    email_placeholder: "Emailingiz",
    subscribe: "Obuna bo'lish",
    login_title: "Xush kelibsiz",
    login_subtitle: "Tizimga kirish uchun ma'lumotlaringizni kiriting",
    email_label: "Email",
    phone_label: "Telefon raqami",
    password_label: "Parol",
    remember_me: "Eslab qolish",
    forgot_password: "Parolni unutdingizmi?",
    login_btn: "Kirish",
    cart_title: "Savatcha",
    cart_subtitle: "Siz tanlagan mahsulotlar ro'yxati",
    empty_cart: "Savatchangiz hozircha bo'sh.",
    total: "Umumiy:",
    order_btn: "Buyurtma qilish"
  },
  ru: {
    nav_categories: "Категории",
    nav_about: "О нас",
    nav_help: "Помощь",
    cat_all: "Все",
    cat_engine: "Детали двигателя",
    cat_suspension: "Ходовая часть",
    cat_brake: "Тормозная система",
    cat_filter: "Фильтры",
    cat_original: "Оригинальные детали",
    cat_accessories: "Аксессуары",
    nav_news: "Новости",
    nav_careers: "Карьера",
    nav_locations: "Адреса",
    nav_faq: "Часто задаваемые вопросы",
    nav_contact: "Контакты",
    nav_support: "Техподдержка",
    login: "Вход",
    logout: "Выход",
    hero_badge_1: "Оригинальные запчасти GM",
    hero_title_1: "Детали Двигателя",
    hero_subtitle_1: "Высококачественные оригинальные детали двигателя и агрегатов для автомобилей Chevrolet.",
    buy_now: "Купить",
    catalog: "Каталог",
    hero_badge_2: "Надежность",
    hero_title_2: "Ходовая Часть",
    hero_subtitle_2: "Пружины, амортизаторы и детали колес для плавного и безопасного движения.",
    contact: "Контакты",
    hero_badge_3: "Быстрая Доставка",
    hero_title_3: "Кузовные Детали",
    hero_subtitle_3: "Фары, бамперы и другие детали кузова с быстрой доставкой по городу.",
    go_to_cart: "В корзину",
    all_parts: "Все детали",
    parts_label: "Запчасти",
    parts_title: "Выбирайте запчасти GM",
    parts_subtitle: "Высококачественные запчасти для ваших автомобилей Chevrolet",
    cat_engine_short: "Двигатель",
    cat_suspension_short: "Ходовая",
    cat_brake_short: "Тормоза",
    cat_filter_short: "Фильтры",
    cat_original_short: "Оригинал",
    cat_accessories_short: "Аксессуары",
    shop_modal_title: "GM Онлайн Магазин",
    shop_modal_subtitle: "Все запчасти и аксессуары в одном месте",
    shop_cat_kuzov: "Кузовные детали",
    shop_cat_kuzov_desc: "Бампер, фары, двери",
    shop_cat_engine: "Двигатель",
    shop_cat_engine_desc: "Поршни, ремни, свечи",
    shop_cat_elektr: "Электрооборудование",
    shop_cat_elektr_desc: "Аккумуляторы, датчики",
    shop_cat_service: "Обслуживание",
    shop_cat_service_desc: "Масла, фильтры, жидкости",
    view_full_catalog: "Посмотреть полный каталог",
    features_badge: "Гарантия",
    features_title: "100% Оригинальные запчасти GM",
    features_desc: "Мы продаем только оригинальную продукцию, поставляемую напрямую с заводов Chevrolet.",
    feature_1: "Гарантия качества и оригинальная продукция",
    feature_2: "Быстрая доставка по всему Узбекистану",
    feature_3: "Бесплатная техническая консультация специалиста",
    learn_more: "Подробнее",
    footer_desc: "Магазин оригинальных запчастей GM для автомобилей Chevrolet. Гарантия качества и надежности.",
    footer_main: "Главная",
    footer_orders: "Мои заказы",
    footer_cart: "Корзина",
    footer_profile: "Профиль",
    footer_categories: "Категории",
    cat_trans: "Трансмиссия",
    footer_company: "Компания",
    footer_about: "О нас",
    footer_careers: "Карьера",
    footer_contact: "Контакты",
    newsletter_title: "Новости",
    newsletter_desc: "Будьте в курсе последних новостей и скидок.",
    email_placeholder: "Ваш Email",
    subscribe: "Подписаться",
    login_title: "Добро пожаловать",
    login_subtitle: "Введите данные для входа в систему",
    email_label: "Email",
    phone_label: "Номер телефона",
    password_label: "Пароль",
    remember_me: "Запомнить меня",
    forgot_password: "Забыли пароль?",
    login_btn: "Войти",
    cart_title: "Корзина",
    cart_subtitle: "Список выбранных товаров",
    empty_cart: "Ваша корзина пока пуста.",
    total: "Итого:",
    order_btn: "Оформить заказ"
  },
  en: {
    nav_categories: "Categories",
    nav_about: "About Us",
    nav_help: "Help Center",
    cat_all: "All",
    cat_engine: "Engine Parts",
    cat_suspension: "Suspension",
    cat_brake: "Brake System",
    cat_filter: "Filters",
    cat_original: "Original Parts",
    cat_accessories: "Accessories",
    nav_news: "News",
    nav_careers: "Careers",
    nav_locations: "Locations",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    nav_support: "Tech Support",
    login: "Login",
    logout: "Logout",
    hero_badge_1: "Original GM Parts",
    hero_title_1: "Engine Parts",
    hero_subtitle_1: "High-quality original engine and unit parts for Chevrolet vehicles.",
    buy_now: "Buy Now",
    catalog: "Catalog",
    hero_badge_2: "Durability",
    hero_title_2: "Suspension Parts",
    hero_subtitle_2: "Springs, shock absorbers and wheel parts for smooth and safe movement.",
    contact: "Contact",
    hero_badge_3: "Fast Delivery",
    hero_title_3: "Body Parts",
    hero_subtitle_3: "Headlights, bumpers and other body parts with fast city-wide delivery.",
    go_to_cart: "Go to Cart",
    all_parts: "All Parts",
    parts_label: "Spare Parts",
    parts_title: "Choose GM Spare Parts",
    parts_subtitle: "High-quality spare parts for your Chevrolet vehicles",
    cat_engine_short: "Engine",
    cat_suspension_short: "Suspension",
    cat_brake_short: "Brakes",
    cat_filter_short: "Filters",
    cat_original_short: "Original",
    cat_accessories_short: "Accessories",
    shop_modal_title: "GM Online Shop",
    shop_modal_subtitle: "All spare parts and accessories in one place",
    shop_cat_kuzov: "Body Parts",
    shop_cat_kuzov_desc: "Bumper, headlight, doors",
    shop_cat_engine: "Engine",
    shop_cat_engine_desc: "Piston, belt, spark plug",
    shop_cat_elektr: "Electrical Equipment",
    shop_cat_elektr_desc: "Battery, sensors",
    shop_cat_service: "Service",
    shop_cat_service_desc: "Oils, filters, liquids",
    view_full_catalog: "View Full Catalog",
    features_badge: "Warranty",
    features_title: "100% Original GM Spare Parts",
    features_desc: "We only sell original products imported directly from Chevrolet factories.",
    feature_1: "Quality assurance and original products",
    feature_2: "Fast delivery across Uzbekistan",
    feature_3: "Free technical consultation from an expert",
    learn_more: "Learn More",
    footer_desc: "Original GM spare parts store for Chevrolet vehicles. Quality and reliability guarantee.",
    footer_main: "Main",
    footer_orders: "My Orders",
    footer_cart: "Cart",
    footer_profile: "Profile",
    footer_categories: "Categories",
    cat_trans: "Transmission",
    footer_company: "Company",
    footer_about: "About Us",
    footer_careers: "Careers",
    footer_contact: "Contact",
    newsletter_title: "Newsletter",
    newsletter_desc: "Stay informed about the latest news and discounts.",
    email_placeholder: "Your Email",
    subscribe: "Subscribe",
    login_title: "Welcome",
    login_subtitle: "Enter your details to log in",
    email_label: "Email",
    phone_label: "Phone Number",
    password_label: "Password",
    remember_me: "Remember me",
    forgot_password: "Forgot password?",
    login_btn: "Login",
    cart_title: "Cart",
    cart_subtitle: "List of selected products",
    empty_cart: "Your cart is currently empty.",
    total: "Total:",
    order_btn: "Order Now"
  }
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
document.querySelectorAll(".dropdown-item:not(.lang-item)").forEach(item => {
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

        btn.addEventListener('click', toggle);
        if (close) close.addEventListener('click', toggle);
        if (overlay) overlay.addEventListener('click', toggle);
    }
});

// Login buttons handling (desktop & mobile)
const loginModal = document.getElementById('loginModal');
if (loginModal) {
    const loginClose = document.getElementById('closeModal');
    const loginOverlay = document.getElementById('modalOverlay');
    
    // Dynamic logic for admin email
    const loginEmailInput = document.getElementById('email');
    const loginPhoneInput = document.getElementById('phone');
    if (loginEmailInput && loginPhoneInput) {
        loginEmailInput.addEventListener('input', (e) => {
            if (e.target.value.trim() === 'admin@gmail.com') {
                loginPhoneInput.required = false;
                loginPhoneInput.parentElement.style.display = 'none';
            } else {
                loginPhoneInput.required = true;
                loginPhoneInput.parentElement.style.display = 'block';
            }
        });
    }

    document.querySelectorAll('.btn-login').forEach(btn => {
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
                loginModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (loginClose) loginClose.addEventListener('click', () => {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    if (loginOverlay) loginOverlay.addEventListener('click', () => {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

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
    
    // Save order to localStorage
    const orderId = 'GM-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
        id: orderId,
        userEmail: localStorage.getItem('userEmail') || 'Noma\'lum',
        userPhone: localStorage.getItem('userPhone') || 'Noma\'lum',
        items: [...cart],
        totalPrice: cart.reduce((total, item) => total + (parseInt(item.price.replace(/\D/g, '')) || 0), 0),
        date: new Date().toLocaleString(),
        status: 'Yangi'
    };
    
    let orders = JSON.parse(localStorage.getItem('gm_orders')) || [];
    orders.unshift(newOrder);
    localStorage.setItem('gm_orders', JSON.stringify(orders));

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
                const passwordInput = document.getElementById('password');
                const email = emailInput ? emailInput.value.trim() : '';
                const phone = phoneInput ? phoneInput.value.trim() : '';
                const pass = passwordInput ? passwordInput.value : '';
                
                // Admin check
                if (email === 'admin@gmail.com' && pass === '12345') {
                    sessionStorage.setItem('admin_auth', 'true');
                    window.location.href = 'admin.html';
                    return;
                }
                
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
    const loginBtns = document.querySelectorAll('.btn-login');
    const lang = localStorage.getItem('selected_lang') || 'uz';
    const t = translations[lang.toLowerCase()];

    loginBtns.forEach(btn => {
        if (isLoggedIn) {
            btn.textContent = t.logout;
            btn.classList.add('logged-in');
        } else {
            btn.textContent = t.login;
            btn.classList.remove('logged-in');
        }
    });
}
refreshLoginButton();

// --- THEME TOGGLE LOGIC ---
const themeToggles = document.querySelectorAll(".theme-toggle");
const htmlElement = document.documentElement;

const getTheme = () => localStorage.getItem("theme") || "light";

const setTheme = (theme) => {
  htmlElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

themeToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  });
});

// --- MOBILE MENU LOGIC ---
if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
  });

  // Close menu on link click
  nav.querySelectorAll(".nav__link, .dropdown-item").forEach(link => {
    link.addEventListener("click", () => {
      const isDropdownTrigger = link.closest('.nav__item--dropdown') && !link.classList.contains('dropdown-item') && !link.classList.contains('lang-item');
      const href = link.getAttribute('href');
      
      if (link.classList.contains('lang-item') || (!isDropdownTrigger && href !== '#' && !link.classList.contains('lang-btn'))) {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });
}

// --- LANGUAGE SELECTOR LOGIC ---
const langSelectors = document.querySelectorAll('.lang-selector');

langSelectors.forEach(langSelector => {
  const langBtn = langSelector.querySelector('.lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Close other dropdowns
      langSelectors.forEach(other => {
        if (other !== langSelector) other.classList.remove('is-open');
      });
      
      langSelector.classList.toggle('is-open');
    });
  }
  
  const langItems = langSelector.querySelectorAll('.lang-item');
  langItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = item.dataset.lang.toLowerCase();
      changeLanguage(lang);
      langSelector.classList.remove('is-open');
    });
  });
});

function changeLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      // If it's a link or button with an SVG, we need to preserve the SVG
      const svg = el.querySelector('svg');
      if (svg) {
        el.innerHTML = t[key] + ' ' + svg.outerHTML;
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  // Update typeLabels for products
  typeLabels = {
    filter: t.cat_filter_short,
    brake: t.cat_brake_short,
    engine: t.cat_engine_short,
    suspension: t.cat_suspension_short,
    original: t.cat_original_short,
    accessories: t.cat_accessories_short
  };

  // Update header button labels
  document.querySelectorAll('.lang-btn span').forEach(span => {
    span.textContent = lang.toUpperCase();
  });

  // Refresh login button text
  refreshLoginButton();

  // Re-render products to apply translated labels
  const activeTab = document.querySelector('.tab.active');
  render(activeTab ? activeTab.dataset.type : 'all');

  localStorage.setItem('selected_lang', lang);
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (langSelector && !langSelector.contains(e.target)) {
    langSelector.classList.remove('is-open');
  }
});

// Load saved language
const savedLang = localStorage.getItem('selected_lang') || 'uz';
changeLanguage(savedLang);

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
