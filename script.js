let wood = parseInt(localStorage.getItem('wood')) || 0;
let workers = parseInt(localStorage.getItem('workers')) || 0;
let prestigeBonus = parseInt(localStorage.getItem('prestigeBonus')) || 0;
let unlockedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];
let lastVisit = parseInt(localStorage.getItem('lastVisit')) || Date.now();

const woodEl = document.getElementById('wood');
const workersEl = document.getElementById('workers');
const woodPerSecondEl = document.getElementById('woodPerSecond');
const chopBtn = document.getElementById('chopBtn');
const buyWorkerBtn = document.getElementById('buyWorker');
const resetGameBtn = document.getElementById('resetGame');
const fullResetBtn = document.getElementById('fullReset');
const achievementsModal = document.getElementById('achievementsModal');
const closeAchievements = document.getElementById('closeAchievements');

const achievements = [
  { id: 'firstClick', name: 'Первый удар', condition: () => wood >= 1 },
  { id: 'tenWood', name: '10 дерева!', condition: () => wood >= 10 },
  { id: 'firstWorker', name: 'Первый рабочий', condition: () => workers >= 1 },
  { id: 'prestige1', name: 'Первый престиж', condition: () => prestigeBonus >= 1 },
  { id: 'wood100', name: '100 дерева', condition: () => wood >= 100 },
  { id: 'wood500', name: '500 дерева', condition: () => wood >= 500 },
  { id: 'wood1k', name: '1000 дерева', condition: () => wood >= 1000 },
  { id: 'wood10k', name: '10 000 дерева', condition: () => wood >= 10000 },
  { id: 'wood100k', name: '100 000 дерева', condition: () => wood >= 100000 },
  { id: 'worker5', name: '5 рабочих', condition: () => workers >= 5 },
  { id: 'worker10', name: '10 рабочих', condition: () => workers >= 10 },
  { id: 'worker50', name: '50 рабочих', condition: () => workers >= 50 },
  { id: 'worker100', name: '100 рабочих', condition: () => workers >= 100 },
  { id: 'worker500', name: '500 рабочих', condition: () => workers >= 500 },
  { id: 'prestige5', name: '5 престижей', condition: () => prestigeBonus >= 5 },
  { id: 'prestige10', name: '10 престижей', condition: () => prestigeBonus >= 10 },
  { id: 'prestige50', name: '50 престижей', condition: () => prestigeBonus >= 50 },
  { id: 'prestige100', name: '100 престижей', condition: () => prestigeBonus >= 100 },
  { id: 'woodPerSecond10', name: '10 дерева в сек', condition: () => workers * (1 + prestigeBonus) >= 10 },
  { id: 'woodPerSecond100', name: '100 дерева в сек', condition: () => workers * (1 + prestigeBonus) >= 100 },
  { id: 'woodPerSecond500', name: '500 дерева в сек', condition: () => workers * (1 + prestigeBonus) >= 500 },
  { id: 'clickNothing', name: 'Ничего не произошло', condition: () => wood === 0 && workers === 0 && prestigeBonus === 0 },
  { id: 'overkill', name: 'Больше чем нужно', condition: () => wood >= 1000000 },
  { id: 'lazy', name: 'Пусть другие работают', condition: () => workers >= 100 && wood === 0 },
];

function updateDisplay() {
  woodEl.textContent = wood;
  workersEl.textContent = workers;
  woodPerSecondEl.textContent = workers * (1 + prestigeBonus);
  localStorage.setItem('wood', wood);
  localStorage.setItem('workers', workers);
  localStorage.setItem('prestigeBonus', prestigeBonus);
  localStorage.setItem('lastVisit', Date.now());
}

function checkAchievements() {
  achievements.forEach(a => {
    if (!unlockedAchievements.includes(a.id) && a.condition()) {
      unlockedAchievements.push(a.id);
      localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
      vementPopup(`🏆 Достижение разблокировано: ${a.name}`);
    }
  });
}

function vementPopup(message) {
  const popup = document.getElementById('achievementPopup');
  const msg = document.getElementById('achievementMessage');
  msg.textContent = message;
  popup.classList.remove('hidden');
  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => popup.classList.add('hidden'), 400);
  }, 3000);
}

function showOfflineNotification(message) {
  vementPopup(message);
}

function showAchievements() {
  const list = document.getElementById('achievementsList');
  list.innerHTML = '';
  achievements.forEach(a => {
    const li = document.createElement('li');
    li.textContent = `${a.name} ${unlockedAchievements.includes(a.id) ? '✅' : '❌'}`;
    list.appendChild(li);
  });
  achievementsModal.classList.remove('hidden');
}

buyWorkerBtn.addEventListener('click', () => {
  if (wood >= 10) {
    wood -= 10;
    workers++;
    updateDisplay();
    checkAchievements();
  }
});

resetGameBtn.addEventListener('click', () => {
  if (wood >= 1000) {
    wood = 0;
    workers = 0;
    prestigeBonus += 1;
    updateDisplay();
    checkAchievements();
    vementPopup(`🔁 Престиж! Новый бонус: +${prestigeBonus}`);
  } else {
    vementPopup("Для сброса прогресса нужно хотя бы 1000 дерева.");
  }
});

closeAchievements?.addEventListener('click', () => {
  achievementsModal.classList.add('hidden');
});

function showConfirmationPopup(message, onConfirm, onCancel) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background-color: rgba(0,0,0,0.5); display: flex;
    align-items: center; justify-content: center; z-index: 1000;
  `;

  const box = document.createElement('div');
  box.style.cssText = `
    background: white; padding: 20px; border-radius: 12px;
    text-align: center; max-width: 300px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  `;

  const text = document.createElement('p');
  text.textContent = message;

  const confirmBtn = document.createElement('button');
  confirmBtn.textContent = 'Сбросить';
  confirmBtn.style.backgroundColor = '#e53935';

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Отмена';
  cancelBtn.style.backgroundColor = '#4caf50';

  [confirmBtn, cancelBtn].forEach(btn => {
    btn.style.cssText = `
      margin: 10px; padding: 10px 20px; color: white;
      border: none; border-radius: 8px; font-weight: bold; cursor: pointer;
    `;
  });

  confirmBtn.onclick = () => {
    document.body.removeChild(overlay);
    onConfirm();
  };

  cancelBtn.onclick = () => {
    document.body.removeChild(overlay);
    if (onCancel) onCancel();
  };

  box.appendChild(text);
  box.appendChild(confirmBtn);
  box.appendChild(cancelBtn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

function calculateOfflineWood() {
  const now = Date.now();
  const elapsedTime = now - lastVisit;
  const secondsElapsed = Math.floor(elapsedTime / 15000);
  const woodPerSecond = workers * (1 + prestigeBonus);
  const accumulatedWood = woodPerSecond * secondsElapsed;

  wood += accumulatedWood;
  localStorage.setItem('wood', wood);
  localStorage.setItem('lastVisit', now);

  if (accumulatedWood > 0) {
    showOfflineNotification(`Пока вас не было, вы накопили ${accumulatedWood} дерева!`);
  }
}

calculateOfflineWood();

setInterval(() => {
  wood += workers * (1 + prestigeBonus);
  updateDisplay();
  checkAchievements();
}, 7000);

updateDisplay();
checkAchievements();

// ✅ Прогресс-бар и скрытие загрузки
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.getElementById("progress-bar");

  if (!loadingScreen || !progressBar) return;

  loadingScreen.style.display = "flex";

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }
  }, 500);
});

particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 60,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.3
      },
      "size": {
        "value": 3
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2
      }
    },
    "interactivity": {
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        }
      }
    },
    "retina_detect": true
  }
);

const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("toggle-music");

// Автовоспроизведение (по клику пользователя из-за ограничений браузеров)
document.addEventListener("click", function autoPlayOnce() {
  music.play();
  document.removeEventListener("click", autoPlayOnce);
});

// Переключатель звука
toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = "🔊";
  } else {
    music.pause();
    toggleBtn.textContent = "🔇";
  }
});

document.getElementById('settingsBtn').addEventListener('click', () => {
  window.location.href = 'settings.html';
});

const audio = document.getElementById('bg-music');

// При загрузке страницы выставляем громкость из localStorage (или 0.5 по умолчанию)
let savedVolume = localStorage.getItem('musicVolume');
if (savedVolume === null) savedVolume = 50;
audio.volume = savedVolume / 100;

// Если в другой вкладке изменили громкость, обновляем громкость в текущей странице
window.addEventListener('storage', (event) => {
  if (event.key === 'musicVolume') {
    audio.volume = event.newValue / 100;
  }
});

function applyGraphicsQuality() {
  const quality = localStorage.getItem('graphicsQuality') || 'medium';
  document.body.classList.remove('graphics-low', 'graphics-medium', 'graphics-high');
  document.body.classList.add('graphics-' + quality);
}

applyGraphicsQuality();

window.addEventListener('storage', (e) => {
  if (e.key === 'graphicsQuality') applyGraphicsQuality();
});

let chopClicks = 0;           // счетчик кликов
const clicksNeeded = 10;      // сколько кликов надо сделать для получения дерева

chopBtn.addEventListener('click', () => {
  chopClicks++;

  if (chopClicks >= clicksNeeded) {
    // После достижения нужного количества кликов выдаём дерево
    const randomWood = Math.floor(Math.random() * 11);  // от 0 до 10 дерева
    wood += randomWood + prestigeBonus;

    vementPopup(`Вы получили ${randomWood} дерева!`);
    
    chopClicks = 0;  // сбросить счётчик

    updateDisplay();
    checkAchievements();
  } else {
    // Можно выводить прогресс, если хочешь
    vementPopup(`Нажмите ещё ${clicksNeeded - chopClicks} раз(а) чтобы получить дерево`);
  }
});

const firebaseConfig = {
  apiKey: "AIzaSyBxBkAjiy55DO7UBKltpxeagqzTIG7whSM",
  authDomain: "lesorubik-b8937.firebaseapp.com",
  projectId: "lesorubik-b8937",
  storageBucket: "lesorubik-b8937.firebasestorage.app",
  messagingSenderId: "587896530691",
  appId: "1:587896530691:web:bcf53cb37468ca66fd6b36"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function saveUserStats(userId) {
  db.collection('users').doc(userId).set({
    wood,
    workers,
    prestigeBonus,
    achievements: unlockedAchievements
  })
  .then(() => console.log('Статистика сохранена'))
  .catch(error => console.error('Ошибка сохранения:', error));
}

document.getElementById('exitBtn').addEventListener('click', () => {
  window.location.assign('menu.html');  // Альтернатива window.location.href
});

