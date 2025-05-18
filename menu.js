// Обработчики кнопок
document.getElementById('faqBtn').addEventListener('click', () => {
  const faqText = `
  Часто задаваемые вопросы:
  1. Как начать игру? — Нажмите кнопку "Начать игру".
  2. Как открыть магазин? — Нажмите кнопку "Магазин".
  3. Где настройки? — Нажмите "Настройки".
  `;

  showNotification(faqText);
});

document.getElementById('startGameBtn').addEventListener('click', () => {
  window.location.href = 'menu.html';
});

document.getElementById('settingsBtn').addEventListener('click', () => {
  window.location.href = 'settings.html';
});


document.getElementById('shopBtn').addEventListener('click', () => {
  // Логика открытия магазина (если есть)
  alert('Открываем магазин...'); // или переход куда-то
});

document.getElementById('faqBtn').addEventListener('click', () => {
  window.location.href = 'faq.html';
});

function generateUID() {
  // Простая функция для генерации UID (можно заменить на что-то сложнее)
  return 'user-' + Math.random().toString(36).substr(2, 9);
}

// Проверяем, есть ли уже uid в localStorage
let userId = localStorage.getItem('userId');

if (!userId) {
  userId = generateUID();
  localStorage.setItem('userId', userId);
}

console.log('User ID для этого устройства:', userId);

// Теперь везде, где работаешь с Firebase, используй этот userId
// Например, сохранение прогресса:
function saveUserStats() {
  db.collection('users').doc(userId).set({
    wood,
    workers,
    prestigeBonus,
    achievements: unlockedAchievements
  })
  .then(() => console.log('Данные пользователя сохранены'))
  .catch(err => console.error('Ошибка при сохранении:', err));
}

// Аналогично загрузка данных
function loadUserStats() {
  db.collection('users').doc(userId).get()
  .then(doc => {
    if (doc.exists) {
      const data = doc.data();
      wood = data.wood || 0;
      workers = data.workers || 0;
      prestigeBonus = data.prestigeBonus || 0;
      unlockedAchievements = data.achievements || [];
      updateDisplay();
      checkAchievements();
    }
  })
  .catch(err => console.error('Ошибка при загрузке:', err));
}

// Вызови загрузку при старте игры
loadUserStats();
