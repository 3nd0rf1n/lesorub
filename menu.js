const startGameBtn = document.getElementById('startGameBtn');
const settingsBtn = document.getElementById('settingsBtn');

startGameBtn.addEventListener('click', () => {
  // Перейдем на главную игру
  window.location.href = 'index.html'; // или путь к твоему игровому файлу
});

settingsBtn.addEventListener('click', () => {
  alert('Здесь будут настройки игры!');
});
