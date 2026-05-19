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
            <td>${p.price} UZS</td>
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
    settings: document.getElementById('settingsSection')
};

const navLinks = {
    dashboard: document.getElementById('navDashboard'),
    statistics: document.getElementById('navStatistics'),
    users: document.getElementById('navUsers'),
    settings: document.getElementById('navSettings')
};

const translationsAdmin = {
    uz: {
        dashboard: "Dashboard",
        statistics: "Statistika",
        users: "Foydalanuvchilar",
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
        save: "Saqlash"
    },
    ru: {
        dashboard: "Панель управления",
        statistics: "Статистика",
        users: "Пользователи",
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
        save: "Сохранить"
    },
    en: {
        dashboard: "Dashboard",
        statistics: "Statistics",
        users: "Users",
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
        save: "Save"
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
    if (navLinks.settings) navLinks.settings.querySelector('span').textContent = t.settings;
    
    // Update header
    const pageTitle = document.getElementById('pageTitle');
    const openAddModal = document.getElementById('openAddModal');
    const welcomeText = document.querySelector('.admin-header p');
    
    if (welcomeText) welcomeText.textContent = t.welcome;
    if (openAddModal) openAddModal.textContent = t.newProduct;
    
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
    document.getElementById('saveProfileBtn').textContent = t.save;
    
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

// Profile logic
document.getElementById('saveProfileBtn').addEventListener('click', () => {
    const name = document.getElementById('adminNameInput').value;
    const email = document.getElementById('adminEmailInput').value;
    localStorage.setItem('admin_name', name);
    localStorage.setItem('admin_email', email);
    alert(currentLang === 'uz' ? 'Sozlamalar saqlandi!' : (currentLang === 'ru' ? 'Настройки сохранены!' : 'Settings saved!'));
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
navLinks.settings?.addEventListener('click', (e) => { e.preventDefault(); showSection('settings'); });

// Initialize
render();
