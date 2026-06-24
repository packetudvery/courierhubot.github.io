console.log('=== WEB APP ЗАПУЩЕН ===');

const Telegram = window.Telegram.WebApp;
Telegram.ready();
Telegram.expand();

console.log('Telegram WebApp инициализирован');

// ===== ПРОВЕРЯЕМ, ЧТО ПРИШЛО ОТ TELEGRAM =====
console.log('initDataUnsafe:', Telegram.initDataUnsafe);

const user = Telegram.initDataUnsafe?.user || {};
console.log('Данные пользователя из Telegram:', user);

// ===== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ =====
let userData = {
    id: user.id || '—',
    username: user.username || '—',
    first_name: user.first_name || 'Курьер',
    avatar: user.photo_url || '',
    points: 0,
    registered_at: '—'
};

console.log('Начальные данные:', userData);

// ===== DOM-элементы =====
const content = document.getElementById('content');
const navItems = document.querySelectorAll('.nav-item');

console.log('DOM загружен, элементов навигации:', navItems.length);

// ===== ФОРМАТИРОВАНИЕ ДАТЫ =====
function formatDate(dateStr) {
    if (!dateStr || dateStr === '—') return '—';
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        console.error('Ошибка форматирования даты:', e);
        return '—';
    }
}

// ===== ОТРИСОВКА СТРАНИЦ =====
function renderPage(page) {
    console.log(`Отрисовка страницы: ${page}`);

    if (page === 'home') {
        content.innerHTML = `
            <div class="page page-home active">
                <div class="big-icon">🚀</div>
                <h1>Скоро!</h1>
                <p>Здесь будет главная страница</p>
            </div>
        `;
        console.log('Страница HOME отрисована');
    } else if (page === 'profile') {
        console.log('Отрисовка профиля с данными:', userData);

        const avatarUrl = userData.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.first_name)}&size=120&background=3390ec&color=fff&bold=true`;

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
                        <div class="stat-item full">
                            <div class="stat-label">📅 Дата регистрации</div>
                            <div class="stat-value">${formatDate(userData.registered_at)}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        console.log('Страница PROFILE отрисована');
    }

    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
}

// ===== НАВИГАЦИЯ =====
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.dataset.page;
        console.log(`Нажата навигация: ${page}`);
        renderPage(page);
    });
});

// ===== ЗАПРОС ДАННЫХ У БОТА =====
function fetchUserData() {
    console.log('=== ОТПРАВКА ЗАПРОСА К БОТУ ===');
    const data = JSON.stringify({ action: 'get_user_data' });
    console.log('Отправляем данные:', data);

    try {
        Telegram.sendData(data);
        console.log('Данные отправлены успешно');
    } catch (e) {
        console.error('ОШИБКА ОТПРАВКИ:', e);
    }
}

// ===== ОБРАБОТКА ОТВЕТА ОТ БОТА =====
Telegram.onEvent('dataReceived', (data) => {
    console.log('=== ПОЛУЧЕН ОТВЕТ ОТ БОТА ===');
    console.log('Сырые данные:', data);
    console.log('Тип данных:', typeof data);

    try {
        const parsed = JSON.parse(data);
        console.log('Распарсенные данные:', parsed);

        if (parsed.action === 'user_data') {
            console.log('Действие: user_data');
            console.log('Данные от бота:', parsed.data);

            if (parsed.data.points !== undefined) {
                console.log(`Обновляем очки: ${userData.points} -> ${parsed.data.points}`);
                userData.points = parsed.data.points;
            }

            if (parsed.data.registered_at) {
                console.log(`Обновляем дату: ${userData.registered_at} -> ${parsed.data.registered_at}`);
                userData.registered_at = parsed.data.registered_at;
            }

            console.log('Итоговые данные пользователя:', userData);

            // Перерисовываем профиль
            const activePage = document.querySelector('.nav-item.active');
            console.log('Активная страница:', activePage?.dataset.page);

            if (activePage && activePage.dataset.page === 'profile') {
                console.log('Перерисовываем профиль...');
                renderPage('profile');
            } else {
                console.log('Профиль не активен, переключаем...');
                renderPage('profile');
            }
        } else {
            console.warn('Неизвестное действие:', parsed.action);
        }
    } catch (e) {
        console.error('ОШИБКА ПАРСИНГА ОТВЕТА:', e);
        console.error('Стек ошибки:', e.stack);
    }
});

// ===== ОБРАБОТКА ОШИБОК ОТПРАВКИ =====
Telegram.onEvent('dataSendFailed', (error) => {
    console.error('=== ОШИБКА ОТПРАВКИ ДАННЫХ ===');
    console.error('Ошибка:', error);
});

// ===== ЗАПУСК =====
console.log('=== ИНИЦИАЛИЗАЦИЯ ===');
renderPage('profile');
console.log('Запрашиваем данные через 500ms...');
setTimeout(fetchUserData, 500);
