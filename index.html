console.log('=== WEB APP ЗАПУЩЕН ===');

const Telegram = window.Telegram.WebApp;
Telegram.ready();
Telegram.expand();

// ===== СОЗДАЕМ ОКОШКО ДЛЯ ЛОГОВ =====
const logContainer = document.createElement('div');
logContainer.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    right: 10px;
    background: rgba(0,0,0,0.8);
    color: #00ff00;
    font-family: monospace;
    font-size: 12px;
    padding: 10px;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 9999;
    display: none;
    white-space: pre-wrap;
    word-wrap: break-word;
`;
document.body.appendChild(logContainer);

// ===== ФУНКЦИЯ ДЛЯ ВЫВОДА ЛОГОВ =====
function addLog(msg) {
    console.log(msg);
    logContainer.style.display = 'block';
    logContainer.innerHTML += new Date().toLocaleTimeString() + ' ' + msg + '\n';
    logContainer.scrollTop = logContainer.scrollHeight;
}

// ===== ПРОВЕРЯЕМ initData =====
addLog('=== WEB APP ЗАПУЩЕН ===');

const user = Telegram.initDataUnsafe?.user || {};
addLog(`Пользователь: ${user.first_name || 'нет'} (@${user.username || 'нет'})`);

// ===== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ =====
let userData = {
    id: user.id || '—',
    username: user.username || '—',
    first_name: user.first_name || 'Курьер',
    avatar: user.photo_url || '',
    points: 0,
    registered_at: '—'
};

// ===== DOM-элементы =====
const content = document.getElementById('content');
const navItems = document.querySelectorAll('.nav-item');

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
        return '—';
    }
}

// ===== ОТРИСОВКА СТРАНИЦ =====
function renderPage(page) {
    addLog(`Отрисовка: ${page}`);

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
    }

    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
}

// ===== НАВИГАЦИЯ =====
navItems.forEach(item => {
    item.addEventListener('click', () => {
        renderPage(item.dataset.page);
    });
});

// ===== ЗАПРОС ДАННЫХ У БОТА =====
function fetchUserData() {
    const data = JSON.stringify({ action: 'get_user_data' });
    addLog(`📤 Отправка: ${data}`);
    try {
        Telegram.sendData(data);
        addLog('📤 Отправлено успешно');
    } catch (e) {
        addLog(`❌ Ошибка отправки: ${e.message}`);
    }
}

// ===== ОБРАБОТКА ОТВЕТА ОТ БОТА =====
Telegram.onEvent('dataReceived', (data) => {
    addLog(`📥 Получен ответ: ${data}`);
    try {
        const parsed = JSON.parse(data);
        addLog(`📥 Распарсено: ${JSON.stringify(parsed)}`);

        if (parsed.action === 'user_data') {
            if (parsed.data.points !== undefined) {
                addLog(`⭐ Очки: ${userData.points} -> ${parsed.data.points}`);
                userData.points = parsed.data.points;
            }
            if (parsed.data.registered_at) {
                addLog(`📅 Дата: ${userData.registered_at} -> ${parsed.data.registered_at}`);
                userData.registered_at = parsed.data.registered_at;
            }
            renderPage('profile');
            addLog('✅ Профиль обновлен!');
        } else {
            addLog(`⚠️ Неизвестное действие: ${parsed.action}`);
        }
    } catch (e) {
        addLog(`❌ Ошибка парсинга: ${e.message}`);
    }
});

// ===== ОБРАБОТКА ОШИБОК ОТПРАВКИ =====
Telegram.onEvent('dataSendFailed', (error) => {
    addLog(`❌ Ошибка отправки: ${error}`);
});

// ===== ЗАПУСК =====
renderPage('profile');
addLog('⏳ Запрос данных через 500ms...');
setTimeout(fetchUserData, 1000);
