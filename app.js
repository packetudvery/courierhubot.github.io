const Telegram = window.Telegram.WebApp;
Telegram.ready();
Telegram.expand();

// ===== Данные пользователя (только из Telegram) =====
const user = Telegram.initDataUnsafe?.user || {};
const userData = {
    id: user.id || '—',
    username: user.username || '—',
    first_name: user.first_name || 'Курьер',
    avatar: user.photo_url || ''
};

// ===== DOM =====
const content = document.getElementById('content');
const navItems = document.querySelectorAll('.nav-item');

// ===== Отрисовка =====
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
        const avatarUrl = userData.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.first_name)}&size=120&background=3390ec&color=fff&bold=true`;

        // Ссылка на бота с командой +100
        const botUsername = 'courierhubot'; // БЕЗ @, просто имя бота
        const addPointsUrl = `https://t.me/${botUsername}?start=add_points`;

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
                            <div class="stat-value">0</div>
                        </div>
                        <div class="stat-item full">
                            <a href="${addPointsUrl}" style="
                                display: block;
                                background: var(--tg-theme-button-color, #3390ec);
                                color: var(--tg-theme-button-text-color, #fff);
                                text-decoration: none;
                                padding: 12px 24px;
                                border-radius: 12px;
                                font-size: 16px;
                                font-weight: 600;
                                text-align: center;
                                width: 100%;
                            ">
                                🎯 +100 очков
                            </a>
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
        renderPage(item.dataset.page);
    });
});

// ===== Инициализация =====
renderPage('profile');
