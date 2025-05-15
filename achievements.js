document.addEventListener("DOMContentLoaded", () => {
  // Применение графики
  function applyGraphicsQuality() {
    const quality = localStorage.getItem('graphicsQuality') || 'medium';
    document.body.classList.remove('graphics-low', 'graphics-medium', 'graphics-high');
    document.body.classList.add('graphics-' + quality);
  }

  applyGraphicsQuality();

  const list = document.getElementById("achievementsList");
  const achievements = JSON.parse(localStorage.getItem("achievements")) || [];

  const allAchievements = [
    { id: 'firstClick', name: 'Перший удар' },
    { id: 'tenWood', name: '10 дерева!' },
    { id: 'firstWorker', name: 'Перший робітник' },
    { id: 'prestige1', name: 'Перший престиж' },
    { id: 'wood100', name: '100 дерева' },
    { id: 'wood500', name: '500 дерева' },
    { id: 'wood1k', name: '1000 дерева' },
    { id: 'wood10k', name: '10 000 дерева' },
    { id: 'wood100k', name: '100 000 дерева' },
    { id: 'worker5', name: '5 робітників' },
    { id: 'worker10', name: '10 робітників' },
    { id: 'worker50', name: '50 робітників' },
    { id: 'worker100', name: '100 робітників' },
    { id: 'worker500', name: '500 робітників' },
    { id: 'prestige5', name: '5 престижів' },
    { id: 'prestige10', name: '10 престижів' },
    { id: 'prestige50', name: '50 престижів' },
    { id: 'prestige100', name: '100 престижів' },
    { id: 'woodPerSecond10', name: '10 дерева в сек' },
    { id: 'woodPerSecond100', name: '100 дерева в сек' },
    { id: 'woodPerSecond500', name: '500 дерева в сек' },
    { id: 'clickNothing', name: 'Нічого не сталося' },
    { id: 'overkill', name: 'Більше ніж потрібно' },
    { id: 'lazy', name: 'Нехай інші працюють' }
  ];

  allAchievements.forEach(a => {
    const li = document.createElement("li");
    li.textContent = `${a.name} ${achievements.includes(a.id) ? "✅" : "❌"}`;
    list.appendChild(li);
  });

  document.getElementById("closeAchievements").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Прогресс-бар
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.getElementById("progress-bar");

  if (loadingScreen && progressBar) {
    loadingScreen.style.display = "flex";
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 150);
      }
    }, 150);
  }

  // Частицы
  particlesJS('particles-js', {
    "particles": {
      "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#ffffff" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.3 },
      "size": { "value": 3 },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.2,
        "width": 1
      },
      "move": { "enable": true, "speed": 2 }
    },
    "interactivity": {
      "events": { "onhover": { "enable": true, "mode": "repulse" } }
    },
    "retina_detect": true
  });

  // Громкость
  const audio = document.getElementById('bg-music');
  let savedVolume = localStorage.getItem('musicVolume');
  if (savedVolume === null) savedVolume = 50;
  if (audio) audio.volume = savedVolume / 100;
});

// Следим за изменением графики
window.addEventListener('storage', (e) => {
  if (e.key === 'graphicsQuality') {
    document.body.classList.remove('graphics-low', 'graphics-medium', 'graphics-high');
    document.body.classList.add('graphics-' + e.newValue);
  }

  if (e.key === 'musicVolume') {
    const audio = document.getElementById('bg-music');
    if (audio) audio.volume = e.newValue / 100;
  }
});
