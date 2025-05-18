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

