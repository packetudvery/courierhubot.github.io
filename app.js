const Telegram = window.Telegram.WebApp;
Telegram.ready();
Telegram.expand();

// ===== Данные пользователя =====
let userData = {
    id: Telegram.initDataUnsafe?.user?.id || '—',
    username: Telegram.initDataUnsafe?.user?.username || '—',
    first_name: Telegram.initDataUnsafe?.user?.first_name || 'Курьер',
    avatar: Telegram.initDataUnsafe?.user?.photo_url || '',
    points: 0,
    registered_at: '—'
};

// ===== DOM-элементы =====
const content = document.getElementById('content');
const navItems = document.querySelectorAll('.nav-item');

// ===== Отрисовка страниц =====
function renderPage(page) {
    if (page === 'home') {
        content.innerHTML = `
            <div class="page page-home active">
                <div class="big-icon">🚀</div>
                <h1>Скоро!</h1>
                <p>Здесь будет главная страница</p>
            </div>
        `;
    } else if (page === 'profile') {
        const avatarUrl = userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.first_name)}&size=120&background=3390ec&color=fff&bold=true`;
        
        let formattedDate = '—';
        if (userData.registered_at && userData.registered_at !== '—') {
            try {
                const date = new Date(userData.registered_at);
                formattedDate = date.toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch (e) {
                formattedDate = '—';
            }
        }

        content.innerHTML = `
            <div class="page page-profile active">
                <div class="profile-card">
                    <img class="profile-avatar" src="${avatarUrl}" alt="avatar">
                    <div class="profile-name">${userData.first_name}</div>
                    <div class="profile-username">@${userData.username}</div>
                    <div class="profile-stats">
                        <div class="stat-item">
                            <div class="stat-label">🆔 ID</div>
                            <div class="stat-value">${userData.id}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">⭐ Очки</div>
                            <div class="stat-value">${userData.points}</div>
                        </div>
                        <div class="stat-item" style="grid-column: 1 / -1;">
                            <div class="stat-label">📅 Дата регистрации</div>
                            <div class="stat-value">${formattedDate}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
}

// ===== Навигация =====
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.dataset.page;
        renderPage(page);
    });
});

// ===== Запрос данных у бота =====
function fetchUserData() {
    Telegram.sendData(JSON.stringify({ action: 'get_user_data' }));
}

// ===== Обработка данных от бота =====
Telegram.WebApp.onEvent('dataReceived', (data) => {
    try {
        const parsed = JSON.parse(data);
        if (parsed.action === 'user_data') {
            userData.points = parsed.data.points || 0;
            userData.registered_at = parsed.data.registered_at || '—';
            renderPage('profile');
        }
    } catch (e) {
        console.error('Ошибка парсинга данных:', e);
    }
});

// ===== Инициализация =====
renderPage('home');
setTimeout(fetchUserData, 500);
