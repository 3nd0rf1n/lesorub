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

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startGameBtn').addEventListener('click', () => {
    window.location.href = 'menu.html';
  });
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

document.addEventListener('DOMContentLoaded', () => {
  const updatePopup = document.getElementById('updatePopup');

  if (!localStorage.getItem('updatePopupClosed')) {
    updatePopup.classList.remove('hidden');
  }

  updatePopup.addEventListener('click', () => {
    updatePopup.classList.add('hidden');
    localStorage.setItem('updatePopupClosed', 'true');
  });
});
  
const tips = [
  "Всегда руби дерево с умом!",
  "Найми больше робітників для автоматичної роботи.",
  "Улучшай панели для максимальной эффективности.",
  "Не забывай про достижения — они дают бонусы!",
  "Звукові ефекти роблять гру цікавішою.",
  "Завантаження гри тепер проходить швидше.",
];

const tipElement = document.getElementById('tip');
let currentTipIndex = 0;

function showTip(index) {
  tipElement.style.opacity = 0; // спрячем текст

  setTimeout(() => {
    tipElement.textContent = tips[index];
    tipElement.style.opacity = 1; // покажем текст
  }, 800); // совпадает с CSS transition
}

function nextTip() {
  currentTipIndex = (currentTipIndex + 1) % tips.length;
  showTip(currentTipIndex);
}

// Отобразим сразу первый совет
showTip(currentTipIndex);

// Меняем совет каждые 7 секунд
setInterval(nextTip, 7000);

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html'; // или путь к твоей странице входа
    });
  }
});
