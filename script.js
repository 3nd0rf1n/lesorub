// Инициализация Firebase (замените config на свои данные из консоли Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyAOqsclFbwauR4XyadH1TNJys149Mx7tHI",
  authDomain: "lesorub-e022b.firebaseapp.com",
  databaseURL: "https://lesorub-e022b-default-rtdb.firebaseio.com",
  projectId: "lesorub-e022b",
<<<<<<< HEAD
  storageBucket: "lesorub-e022b.appspot.com",
=======
  storageBucket: "lesorub-e022b.firebasestorage.app",
>>>>>>> 3d1938cc1fdef94cb46ec535a031845d6dc022a4
  messagingSenderId: "634001284128",
  appId: "1:634001284128:web:3002d6d0bc1338ff1c7045"
};

// Инициализация Firebase App и Realtime Database
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Переменные из localStorage или по умолчанию
<<<<<<< HEAD
let currentUserId = null;
=======
>>>>>>> 3d1938cc1fdef94cb46ec535a031845d6dc022a4
let clickCount = 0;
let clicksRequired = getRandomClicks();
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

function getRandomClicks() {
  return Math.floor(Math.random() * 5) + 3; // от 3 до 7 кликов
}

function getRandomWoodReward() {
  return Math.floor(Math.random() * 11) + 5; // от 5 до 15 дерева
}

// Сохраняем прогресс в Realtime Database
function saveProgress() {
<<<<<<< HEAD
  if (!currentUserId) return; // если пользователь не авторизован, не сохраняем

=======
>>>>>>> 3d1938cc1fdef94cb46ec535a031845d6dc022a4
  const data = {
    wood,
    workers,
    prestigeBonus,
    unlockedAchievements,
    lastVisit: Date.now(),
  };

<<<<<<< HEAD
  database.ref('users/' + currentUserId).set(data)
=======
  database.ref('users/' + deviceId).set(data)
>>>>>>> 3d1938cc1fdef94cb46ec535a031845d6dc022a4
    .then(() => {
      console.log('Прогресс успешно сохранён в Firebase Realtime Database');
    })
    .catch((error) => {
      console.error('Ошибка при сохранении прогресса: ', error);
    });
}

<<<<<<< HEAD

// Загружаем прогресс из Realtime Database
async function loadProgress(uid) {
  try {
    const snapshot = await database.ref('users/' + uid).once('value');
=======
// Загружаем прогресс из Realtime Database
async function loadProgress() {
  try {
    const snapshot = await database.ref('users/' + deviceId).once('value');
>>>>>>> 3d1938cc1fdef94cb46ec535a031845d6dc022a4
    if (snapshot.exists()) {
      const data = snapshot.val();

      wood = data.wood ?? wood;
      workers = data.workers ?? workers;
      prestigeBonus = data.prestigeBonus ?? prestigeBonus;
      unlockedAchievements = data.unlockedAchievements ?? unlockedAchievements;
      lastVisit = data.lastVisit ?? lastVisit;

      updateDisplay();
      checkAchievements();

      console.log('Прогресс загружен из Firebase Realtime Database');
    } else {
      console.log('Данных в Firebase для пользователя нет, используем localStorage');
    }
  } catch (error) {
    console.error('Ошибка при загрузке прогресса из Firebase: ', error);
  }
}

<<<<<<< HEAD

=======
>>>>>>> 3d1938cc1fdef94cb46ec535a031845d6dc022a4
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
    progress += Math.random() * 15;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      loadingScreen.style.display = "none";
    }
  }, 300);
});

<<<<<<< HEAD
// Сохраняем прогресс автоматически каждые 30 секунд
setInterval(saveProgress, 30000);

=======
// ID устройства
const deviceId = localStorage.getItem('deviceId') || (() => {
  const id = 'device-' + Math.random().toString(36).substr(2, 16);
  localStorage.setItem('deviceId', id);
  return id;
})();

// Загружаем прогресс из Firebase при старте
loadProgress();

// Сохраняем прогресс автоматически каждые 30 секунд
setInterval(saveProgress, 1000);

>>>>>>> 3d1938cc1fdef94cb46ec535a031845d6dc022a4
// Сохраняем прогресс при закрытии страницы
window.addEventListener('beforeunload', saveProgress);

chopBtn.addEventListener('click', () => {
  clickCount++;

  if (clickCount >= clicksRequired) {
    const reward = getRandomWoodReward();
    wood += reward;
    clickCount = 0;
    clicksRequired = getRandomClicks();

    vementPopup(`🌲 Вы срубили дерево и получили ${reward} дерева!`);

    updateDisplay();
    checkAchievements();
  } else {
    vementPopup(`🪓 Удар по дереву (${clickCount}/${clicksRequired})`);
  }
});
<<<<<<< HEAD

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUserId = user.uid;  // <-- сюда надо сохранить
    console.log('Пользователь вошёл:', user.uid);
    loadProgress(user.uid);
  } else {
    window.location.href = 'login.html';
  }
});



=======
>>>>>>> 3d1938cc1fdef94cb46ec535a031845d6dc022a4
