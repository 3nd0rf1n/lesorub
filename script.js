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
const achievementsBtn = document.getElementById('achievementsBtn');
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

chopBtn.addEventListener('click', () => {
  wood += 1 + prestigeBonus;
  updateDisplay();
  checkAchievements();
});

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

fullResetBtn.addEventListener('click', () => {
  showConfirmationPopup("Вы уверены, что хотите сбросить весь прогресс?", () => {
    localStorage.clear();
    wood = 0;
    workers = 0;
    prestigeBonus = 0;
    unlockedAchievements = [];
    updateDisplay();
    vementPopup("Прогресс сброшен!");
  });
});


achievementsBtn.addEventListener('click', () => {
  showAchievements();
});

closeAchievements.addEventListener('click', () => {
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
  const secondsElapsed = Math.floor(elapsedTime / 1000);
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
}, 1000);

updateDisplay();
checkAchievements();

achievementsBtn.addEventListener('click', () => {
  showAchievements(); // Обновляем список достижений
  achievementsModal.classList.remove('hidden');
  achievementsModal.classList.add('show');
});

closeAchievements.addEventListener('click', () => {
  achievementsModal.classList.remove('show');
  achievementsModal.classList.add('hidden');
});

// При загрузке страницы закрываем модальное окно
window.addEventListener('DOMContentLoaded', () => {
  achievementsModal.classList.remove('show');
  achievementsModal.classList.add('hidden');
});

document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.getElementById("progress-bar");

  // Показываем экран загрузки каждый раз
  loadingScreen.style.display = "flex"; 

  // Имитация процесса загрузки
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.style.display = "none"; // Скрываем экран загрузки
      }, 500); // Задержка перед скрытием
    }
  }, 500); // Обновляем прогресс каждые 500 мс
});

