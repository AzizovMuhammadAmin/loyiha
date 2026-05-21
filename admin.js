const initialData = [
  {
    id: 1,
    name: "Yog' filtri",
    type: "filter",
    price: "85,000",
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

let products = JSON.parse(localStorage.getItem('gm_products')) || initialData;

// Fix missing IDs in localStorage data
products = products.map((item, index) => {
    if (!item.id) {
        return { ...item, id: index + 1 };
    }
    return item;
});
localStorage.setItem('gm_products', JSON.stringify(products));

const tableBody = document.getElementById('adminTableBody');
const adminForm = document.getElementById('adminForm');
const adminModal = document.getElementById('adminModal');
const modalTitle = document.getElementById('modalTitle');
const totalLabel = document.getElementById('totalProducts');
const availableLabel = document.getElementById('availableProducts');

const typeLabels = {
  filter: "Filtrlar",
  brake: "Tormoz tizimi",
  engine: "Dvigatel qismlari",
  suspension: "Hadavoy qism",
  original: "Radnoy detallar",
  accessories: "Bezklar"
};

function save() {
    localStorage.setItem('gm_products', JSON.stringify(products));
    render();
}

function render() {
    tableBody.innerHTML = '';
    products.forEach((p, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${p.img || 'images/logo.png'}" class="product-img" onerror="this.src='images/logo.png'"></td>
            <td><strong>${p.name}</strong></td>
            <td>${typeLabels[p.type] || p.type}</td>
            <td>${p.price}</td>
            <td><span class="status-badge ${p.status === 'Sotildi' ? 'status-badge--danger' : 'status-badge--success'}" style="${p.status === 'Sotildi' ? 'background: rgba(239,68,68,0.1); color: #ef4444;' : ''}">${p.status}</span></td>
            <td>
                <div class="actions">
                    <button class="action-btn action-btn--edit" onclick="editProduct(${index})">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="action-btn action-btn--delete" onclick="deleteProduct(${index})">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    totalLabel.textContent = products.length;
    availableLabel.textContent = products.filter(p => p.status === 'Mavjud').length;
    
    renderChart();
}

let categoryChartInstance = null;

function renderChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    const countsAvailable = {};
    const countsSold = {};
    
    products.forEach(p => {
        if (p.status === 'Sotildi') {
            countsSold[p.type] = (countsSold[p.type] || 0) + 1;
        } else {
            countsAvailable[p.type] = (countsAvailable[p.type] || 0) + 1;
        }
    });

    const allTypes = Object.keys(typeLabels);
    const labels = allTypes.map(k => typeLabels[k]);
    
    const dataAvailable = allTypes.map(k => countsAvailable[k] || 0);
    const dataSold = allTypes.map(k => countsSold[k] || 0);

    if (categoryChartInstance) {
        categoryChartInstance.destroy();
    }

    categoryChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Mavjud',
                    data: dataAvailable,
                    backgroundColor: 'rgba(0, 195, 122, 0.6)',
                    borderColor: 'rgba(0, 195, 122, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Sotildi',
                    data: dataSold,
                    backgroundColor: 'rgba(239, 68, 68, 0.6)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

window.deleteProduct = (index) => {
    if(confirm('Ushbu mahsulotni o\'chirmoqchimisiz?')) {
        products.splice(index, 1);
        save();
    }
};

window.editProduct = (index) => {
    const p = products[index];
    document.getElementById('pName').value = p.name;
    document.getElementById('pCategory').value = p.type;
    document.getElementById('pPrice').value = p.price.replace(' UZS', '');
    document.getElementById('pImg').value = p.img;
    document.getElementById('editIndex').value = index;
    modalTitle.textContent = 'Mahsulotni tahrirlash';
    adminModal.classList.add('active');
};

document.getElementById('openAddModal').addEventListener('click', () => {
    adminForm.reset();
    document.getElementById('editIndex').value = '';
    modalTitle.textContent = 'Yangi mahsulot qo\'shish';
    adminModal.classList.add('active');
});

const closeModal = () => adminModal.classList.remove('active');
document.getElementById('closeAdminModal').addEventListener('click', closeModal);
document.getElementById('adminModalOverlay').addEventListener('click', closeModal);

adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const index = document.getElementById('editIndex').value;
    const newProduct = {
        id: index === '' ? Date.now() : products[index].id,
        name: document.getElementById('pName').value,
        type: document.getElementById('pCategory').value,
        price: document.getElementById('pPrice').value.includes('UZS') ? document.getElementById('pPrice').value : document.getElementById('pPrice').value + ' UZS',
        brand: "GM Original",
        status: "Mavjud",
        img: document.getElementById('pImg').value || "images/logo.png"
    };

    if(index === '') {
        products.unshift(newProduct);
    } else {
        products[index] = newProduct;
    }

    save();
    closeModal();
});

render();

// Tab switching logic
const sections = {
    dashboard: document.getElementById('dashboardSection'),
    statistics: document.getElementById('statisticsSection'),
    users: document.getElementById('usersSection'),
    orders: document.getElementById('ordersSection'),
    settings: document.getElementById('settingsSection')
};

const navLinks = {
    dashboard: document.getElementById('navDashboard'),
    statistics: document.getElementById('navStatistics'),
    users: document.getElementById('navUsers'),
    orders: document.getElementById('navOrders'),
    settings: document.getElementById('navSettings')
};

const translationsAdmin = {
    uz: {
        dashboard: "Dashboard",
        statistics: "Statistika",
        users: "Foydalanuvchilar",
        orders: "Buyurtmalar",
        settings: "Sozlamalar",
        welcome: "Xush kelibsiz, Admin!",
        newProduct: "Yangi mahsulot",
        setThemeTitle: "Tashqi ko'rinish",
        setThemeName: "Tungi rejim",
        setThemeDesc: "Admin panelni qora rangga o'tkazish",
        setLangTitle: "Til sozlamalari",
        setLangName: "Tizim tili",
        setLangDesc: "Admin panel interfeys tili",
        setProfileTitle: "Admin Profili",
        setProfileNameLabel: "Admin ismi",
        setProfileEmailLabel: "Email manzili",
        logout: "Profildan chiqish",
        ordersTitle: "Buyurtmalar ro'yxati"
    },
    ru: {
        dashboard: "Панель управления",
        statistics: "Статистика",
        users: "Пользователи",
        orders: "Заказы",
        settings: "Настройки",
        welcome: "Добро пожаловать, Админ!",
        newProduct: "Новый продукт",
        setThemeTitle: "Внешний вид",
        setThemeName: "Темный режим",
        setThemeDesc: "Переключить админ панель в темный режим",
        setLangTitle: "Языковые настройки",
        setLangName: "Язык системы",
        setLangDesc: "Язык интерфейса админ панели",
        setProfileTitle: "Профиль Админа",
        setProfileNameLabel: "Имя админа",
        setProfileEmailLabel: "Email адрес",
        logout: "Выйти",
        ordersTitle: "Список заказов"
    },
    en: {
        dashboard: "Dashboard",
        statistics: "Statistics",
        users: "Users",
        orders: "Orders",
        settings: "Settings",
        welcome: "Welcome, Admin!",
        newProduct: "New Product",
        setThemeTitle: "Appearance",
        setThemeName: "Dark Mode",
        setThemeDesc: "Switch admin panel to dark mode",
        setLangTitle: "Language Settings",
        setLangName: "System Language",
        setLangDesc: "Admin panel interface language",
        setProfileTitle: "Admin Profile",
        setProfileNameLabel: "Admin Name",
        setProfileEmailLabel: "Email Address",
        logout: "Logout",
        ordersTitle: "Orders List"
    }
};

function showSection(sectionName) {
    // Hide all
    Object.values(sections).forEach(s => { if(s) s.style.display = 'none'; });
    Object.values(navLinks).forEach(l => { if(l) l.classList.remove('active'); });
    
    // Show specific
    if (sections[sectionName]) sections[sectionName].style.display = 'block';
    if (navLinks[sectionName]) navLinks[sectionName].classList.add('active');
    
    // Update title and buttons
    const pageTitle = document.getElementById('pageTitle');
    const openAddModal = document.getElementById('openAddModal');
    
    if (sectionName === 'dashboard') {
        pageTitle.textContent = 'Dashboard';
        openAddModal.style.display = 'block';
        if (sections.dashboard) {
            // Need to show the nested table as well
            sections.dashboard.querySelector('.product-table-card').style.display = 'block';
            sections.dashboard.querySelector('.stats-grid').style.display = 'grid';
        }
    } else if (sectionName === 'statistics') {
        pageTitle.textContent = 'Statistika';
        openAddModal.style.display = 'none';
        if (sections.dashboard) sections.dashboard.style.display = 'block';
        if (sections.dashboard) sections.dashboard.querySelector('.product-table-card').style.display = 'none';
        if (sections.dashboard) sections.dashboard.querySelector('.stats-grid').style.display = 'none';
    } else if (sectionName === 'users') {
        pageTitle.textContent = translationsAdmin[currentLang].users;
        openAddModal.style.display = 'none';
        renderUsers();
    } else if (sectionName === 'orders') {
        pageTitle.textContent = translationsAdmin[currentLang].orders;
        openAddModal.style.display = 'none';
        renderOrders();
    } else if (sectionName === 'settings') {
        pageTitle.textContent = translationsAdmin[currentLang].settings;
        openAddModal.style.display = 'none';
    }
}

// --- SETTINGS LOGIC ---
let currentLang = localStorage.getItem('admin_lang') || 'uz';

function applyAdminLang(lang) {
    currentLang = lang;
    localStorage.setItem('admin_lang', lang);
    const t = translationsAdmin[lang];
    
    // Update sidebar
    if (navLinks.dashboard) navLinks.dashboard.querySelector('span').textContent = t.dashboard;
    if (navLinks.statistics) navLinks.statistics.querySelector('span').textContent = t.statistics;
    if (navLinks.users) navLinks.users.querySelector('span').textContent = t.users;
    if (navLinks.orders) navLinks.orders.querySelector('span').textContent = t.orders;
    if (navLinks.settings) navLinks.settings.querySelector('span').textContent = t.settings;
    
    // Update header
    const pageTitle = document.getElementById('pageTitle');
    const openAddModal = document.getElementById('openAddModal');
    const welcomeText = document.querySelector('.admin-header p');
    
    if (welcomeText) welcomeText.textContent = t.welcome;
    if (openAddModal) openAddModal.textContent = t.newProduct;
    
    // Update orders title
    const ordersTitle = document.getElementById('ordersTitle');
    if (ordersTitle) ordersTitle.textContent = t.ordersTitle;
    
    // Update settings section
    document.getElementById('setThemeTitle').textContent = t.setThemeTitle;
    document.getElementById('setThemeName').textContent = t.setThemeName;
    document.getElementById('setThemeDesc').textContent = t.setThemeDesc;
    document.getElementById('setLangTitle').textContent = t.setLangTitle;
    document.getElementById('setLangName').textContent = t.setLangName;
    document.getElementById('setLangDesc').textContent = t.setLangDesc;
    document.getElementById('setProfileTitle').textContent = t.setProfileTitle;
    document.getElementById('setProfileNameLabel').textContent = t.setProfileNameLabel;
    document.getElementById('setProfileEmailLabel').textContent = t.setProfileEmailLabel;
    document.getElementById('saveProfileBtn').textContent = t.logout;
    
    // Set selector value
    document.getElementById('adminLangSelector').value = lang;
}

// Theme logic
const themeToggle = document.getElementById('adminThemeToggle');
const body = document.body;

function setTheme(isDark) {
    if (isDark) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('admin_theme', 'dark');
        themeToggle.checked = true;
    } else {
        body.removeAttribute('data-theme');
        localStorage.setItem('admin_theme', 'light');
        themeToggle.checked = false;
    }
}

themeToggle.addEventListener('change', (e) => {
    setTheme(e.target.checked);
});

// Language logic
document.getElementById('adminLangSelector').addEventListener('change', (e) => {
    applyAdminLang(e.target.value);
});

// Auth Logic
const adminLoginOverlay = document.getElementById('adminLoginOverlay');
const adminLoginForm = document.getElementById('adminLoginForm');

if (sessionStorage.getItem('admin_auth') === 'true') {
    adminLoginOverlay.style.display = 'none';
}

if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPassword').value;

        if (email === 'admin@gmail.com' && pass === '12345') {
            sessionStorage.setItem('admin_auth', 'true');
            adminLoginOverlay.style.opacity = '0';
            setTimeout(() => {
                adminLoginOverlay.style.display = 'none';
            }, 400);
        } else {
            alert(currentLang === 'uz' ? 'Email yoki parol xato!' : (currentLang === 'ru' ? 'Неверный email или пароль!' : 'Invalid email or password!'));
        }
    });
}

// Profile logic
document.getElementById('saveProfileBtn').addEventListener('click', () => {
    if (confirm(currentLang === 'uz' ? 'Haqiqatan ham tizimdan chiqmoqchimisiz?' : (currentLang === 'ru' ? 'Вы действительно хотите выйти?' : 'Are you sure you want to logout?'))) {
        sessionStorage.removeItem('admin_auth');
        window.location.reload();
    }
});

// Initialize Settings
const savedTheme = localStorage.getItem('admin_theme');
setTheme(savedTheme === 'dark');

const savedName = localStorage.getItem('admin_name');
if (savedName) document.getElementById('adminNameInput').value = savedName;

const savedEmail = localStorage.getItem('admin_email');
if (savedEmail) document.getElementById('adminEmailInput').value = savedEmail;

applyAdminLang(currentLang);

function renderUsers() {
    const usersTableBody = document.getElementById('usersTableBody');
    if (!usersTableBody) return;
    
    const users = JSON.parse(localStorage.getItem('gm_users')) || [];
    usersTableBody.innerHTML = '';
    
    if (users.length === 0) {
        usersTableBody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px;">Foydalanuvchilar hali mavjud emas.</td></tr>';
        return;
    }
    
    users.forEach(u => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${u.email}</strong></td>
            <td>${u.phone}</td>
            <td style="color: var(--text-light); font-size: 13px;">${u.date}</td>
        `;
        usersTableBody.appendChild(row);
    });
}

navLinks.dashboard?.addEventListener('click', (e) => { e.preventDefault(); showSection('dashboard'); });
navLinks.statistics?.addEventListener('click', (e) => { e.preventDefault(); showSection('statistics'); });
navLinks.users?.addEventListener('click', (e) => { e.preventDefault(); showSection('users'); });
navLinks.orders?.addEventListener('click', (e) => { e.preventDefault(); showSection('orders'); });
navLinks.settings?.addEventListener('click', (e) => { e.preventDefault(); showSection('settings'); });

function renderOrders() {
    const ordersTableBody = document.getElementById('ordersTableBody');
    if (!ordersTableBody) return;
    
    const orders = JSON.parse(localStorage.getItem('gm_orders')) || [];
    ordersTableBody.innerHTML = '';
    
    if (orders.length === 0) {
        const noOrdersText = currentLang === 'uz' ? 'Hozircha buyurtmalar yo\'q' : (currentLang === 'ru' ? 'Заказов пока нет' : 'No orders yet');
        ordersTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px; color: var(--text-light);">${noOrdersText}</td></tr>`;
        return;
    }
    
    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        
        // Render items list inside small container
        const itemsHtml = order.items.map(item => `
            <div style="font-size: 13px; margin-bottom: 2px;">
                • <strong>${item.name}</strong> - ${item.price}
            </div>
        `).join('');
        
        // Status styles
        const isCompleted = order.status === 'Bajarildi';
        const statusText = isCompleted ? (currentLang === 'uz' ? 'Bajarildi' : (currentLang === 'ru' ? 'Выполнен' : 'Completed')) : (currentLang === 'uz' ? 'Yangi' : (currentLang === 'ru' ? 'Новый' : 'New'));
        const statusStyle = isCompleted 
            ? 'background: rgba(0, 195, 122, 0.1); color: #00c37a;' 
            : 'background: rgba(245, 158, 11, 0.1); color: #f59e0b;';
            
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>
                <div><strong>${order.userEmail}</strong></div>
                <div style="font-size: 12px; color: var(--text-light);">${order.userPhone}</div>
            </td>
            <td>
                <div style="max-height: 80px; overflow-y: auto; padding-right: 5px;">
                    ${itemsHtml}
                </div>
            </td>
            <td><strong>${order.totalPrice.toLocaleString()} UZS</strong></td>
            <td style="font-size: 13px; color: var(--text-light);">${order.date}</td>
            <td><span class="status-badge" style="${statusStyle}">${statusText}</span></td>
            <td>
                <div class="actions">
                    ${!isCompleted ? `
                        <button class="action-btn" style="background: rgba(0,195,122,0.1); color: #00c37a;" onclick="completeOrder(${index})" title="${currentLang === 'uz' ? 'Bajarildi deb belgilash' : (currentLang === 'ru' ? 'Отметить как выполненный' : 'Mark as completed')}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                    ` : ''}
                    <button class="action-btn action-btn--delete" onclick="deleteOrder(${index})" title="${currentLang === 'uz' ? 'O\'chirish' : (currentLang === 'ru' ? 'Удалить' : 'Delete')}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                </div>
            </td>
        `;
        ordersTableBody.appendChild(row);
    });
}

window.completeOrder = (index) => {
    const orders = JSON.parse(localStorage.getItem('gm_orders')) || [];
    if (orders[index]) {
        orders[index].status = 'Bajarildi';
        localStorage.setItem('gm_orders', JSON.stringify(orders));
        renderOrders();
    }
};

window.deleteOrder = (index) => {
    const confirmMsg = currentLang === 'uz' ? 'Ushbu buyurtmani o\'chirmoqchimisiz?' : (currentLang === 'ru' ? 'Вы действительно хотите удалить этот заказ?' : 'Are you sure you want to delete this order?');
    if (confirm(confirmMsg)) {
        const orders = JSON.parse(localStorage.getItem('gm_orders')) || [];
        orders.splice(index, 1);
        localStorage.setItem('gm_orders', JSON.stringify(orders));
        renderOrders();
    }
};

// Initialize
render();
