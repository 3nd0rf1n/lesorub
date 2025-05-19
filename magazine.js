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

    // Проверяем, есть ли достаточно дерева
    if (profile.wood >= price) {
        // Уменьшаем количество дерева
        const newWoodBalance = profile.wood - price;
        localStorage.setItem('wood', newWoodBalance);

        if (item === 'changeNickname') {
            // Покупка возможности изменить ник
            openChangeNicknameModal();
        }

        alert('Покупка успешна!');

        // Обновляем UI
        updateProfileUI();
    } else {
        alert('У вас недостаточно дерева для покупки!');
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
        alert('Ник успешно изменён!');
        closeChangeNicknameModal();
    } else {
        alert('Пожалуйста, введите новый ник!');
    }
}

// Закрыть модальное окно
function closeChangeNicknameModal() {
    const modal = document.getElementById('changeNicknameModal');
    modal.style.display = 'none';
}

// Инициализация кнопок
function initShop() {
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        const price = parseInt(button.parentElement.getAttribute('data-price'));
        const item = button.id === 'changeNicknameBtn' ? 'changeNickname' : '';

        button.addEventListener('click', function() {
            handleItemPurchase(price, item);
        });
    });

    // Кнопки для изменения ника
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

// Запуск создания монет при загрузке страницы
createFallingCoins();
