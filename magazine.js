// Загрузка данных профиля (дерево, ник)
function loadProfile() {
    const wood = parseInt(localStorage.getItem('wood')) || 0;
    const nickname = localStorage.getItem('nickname') || 'Не установлен';
    return { wood, nickname };
}

// Обновляем UI с балансом дерева и ником
function updateProfileUI() {
    const profileWoodEl = document.getElementById('profileWood');
    const profile = loadProfile();
    profileWoodEl.textContent = profile.wood.toLocaleString();
}

// Обработка покупки товара
function handleItemPurchase(price, item) {
    const profile = loadProfile();

    if (profile.wood >= price) {
        if (item === 'changeNickname') {
            // Просто сохраняем цену во временную переменную
            localStorage.setItem('pendingNicknameChangePrice', price);
            openChangeNicknameModal();
            return;
        }

        // Если другой товар
        const newWoodBalance = profile.wood - price;
        localStorage.setItem('wood', newWoodBalance);
        showToast('Покупка успешна!', 'success');
        updateProfileUI();
    } else {
        showToast('Недостаточно дерева для покупки!', 'error');
    }
}


// Открыть модальное окно для изменения ника
function openChangeNicknameModal() {
    const modal = document.getElementById('changeNicknameModal');
    modal.style.display = 'flex';
}

// Сохранить новый ник
function saveNewNickname() {
    const newNickname = document.getElementById('newNicknameInput').value.trim();

    if (newNickname) {
        localStorage.setItem('nickname', newNickname);

        const price = parseInt(localStorage.getItem('pendingNicknameChangePrice'));
        if (!isNaN(price)) {
            const profile = loadProfile();
            const newBalance = profile.wood - price;
            localStorage.setItem('wood', newBalance);
            localStorage.removeItem('pendingNicknameChangePrice');
            updateProfileUI();
        }

        showToast('Ник успешно изменён!', 'success');
        closeChangeNicknameModal();
    } else {
        showToast('Введите новый ник!', 'info');
    }
}

// Закрыть модальное окно
function closeChangeNicknameModal() {
    const modal = document.getElementById('changeNicknameModal');
    modal.style.display = 'none';
    localStorage.removeItem('pendingNicknameChangePrice'); // отмена покупки
}


// Инициализация кнопок
function initShop() {
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        const priceEl = button.closest('[data-price]');
        const price = parseInt(priceEl?.dataset.price);
        const item = button.id === 'changeNicknameBtn' ? 'changeNickname' : '';

        console.log('Цена из data-price:', priceEl?.dataset.price, 'Парсится как:', price);

        button.addEventListener('click', function() {
            handleItemPurchase(price, item);
        });
    });

    document.getElementById('saveNewNicknameBtn').addEventListener('click', saveNewNickname);
    document.getElementById('cancelChangeNicknameBtn').addEventListener('click', closeChangeNicknameModal);
}


// Первый вызов при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    updateProfileUI();
    initShop();
});

// Генерация падающих монеток с задержкой
function createFallingCoins() {
    const coinCount = 15; // Количество монеток
    const coinContainer = document.getElementById('fallingCoins');

    for (let i = 0; i < coinCount; i++) {
        const coin = document.createElement('div');
        coin.classList.add('coin');

        // Случайная задержка и продолжительность падения
        const animationDuration = Math.random() * 5 + 12; // Увеличена продолжительность падения (от 12 до 17 секунд)
        const animationDelay = Math.random() * 6; // Случайная задержка (от 0 до 6 секунд)

        // Применяем случайные задержки и продолжительность
        coin.style.animationDuration = `${animationDuration}s`; 
        coin.style.animationDelay = `${animationDelay + 1}s`; // Увеличили задержку на 1 секунду

        // Случайное расположение монеты по горизонтали (слева или справа)
        const randomLeft = Math.random() * 100; // случайная позиция от 0 до 100% ширины экрана
        coin.style.left = `${randomLeft}%`; // Применяем случайное положение

        coin.style.opacity = Math.random() * 0.5 + 0.5; // Случайная прозрачность (от 0.5 до 1)

        coinContainer.appendChild(coin);
    }
}


function showToast(message, type = 'default') {
    const toastContainer = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = 'toast';

    if (type === 'success') toast.style.backgroundColor = '#4caf50';
    if (type === 'error') toast.style.backgroundColor = '#f44336';
    if (type === 'info') toast.style.backgroundColor = '#2196f3';

    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Запуск создания монет при загрузке страницы
createFallingCoins();
