let wood = parseInt(localStorage.getItem('wood')) || 0;
let workers = parseInt(localStorage.getItem('workers')) || 0;
let prestigeBonus = parseInt(localStorage.getItem('prestigeBonus')) || 0;
let unlockedAchievements = JSON.parse(localStorage.getItem('achievements')) || {};

const woodEl = document.getElementById('wood');
const workersEl = document.getElementById('workers');
const woodPerSecondEl = document.getElementById('woodPerSecond');
const buyWorkerBtn = document.getElementById('buyWorker');
const resetGameBtn = document.getElementById('resetGame');
const fullResetBtn = document.getElementById('fullReset');
const notifArea = document.getElementById('notifications');
const achievementsPanel = document.getElementById('achievementsPanel');
const achievementsList = document.getElementById('achievementsList');

document.getElementById('achievementsBtn').addEventListener('click', () => {
    achievementsPanel.classList.toggle('hidden');
    renderAchievements();
});

const achievements = [
    { id: "firstChop", name: "Первое дерево", icon: "🌳", condition: () => wood >= 1 },
    { id: "tenChop", name: "10 деревьев", icon: "🌲", condition: () => wood >= 10 },
    { id: "firstWorker", name: "Нанят первый рабочий", icon: "👷", condition: () => workers >= 1 },
    { id: "prestige1", name: "Первый престиж", icon: "🔁", condition: () => prestigeBonus >= 1 }
];

function checkAchievements() {
    achievements.forEach(a => {
        if (a.condition() && !unlockedAchievements[a.id]) {
            unlockedAchievements[a.id] = true;
            showNotification(`🏆 Достижение: ${a.name}`);
            localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
            renderAchievements();
        }
    });
}

function showNotification(text) {
    const note = document.createElement('div');
    note.className = 'notification';
    note.textContent = text;
    notifArea.appendChild(note);
    setTimeout(() => {
        notifArea.removeChild(note);
    }, 4000);
}

document.getElementById('chopBtn').addEventListener('click', () => {
    wood += 1 + prestigeBonus;
    updateDisplay();
    checkAchievements();
});

buyWorkerBtn.addEventListener('click', () => {
    if (wood >= 10) {
        wood -= 10;
        workers++;
        showNotification('👷 Рабочий нанят!');
        updateDisplay();
        checkAchievements();
    } else {
        showNotification('❌ Не хватает дерева!');
    }
});

resetGameBtn.addEventListener('click', () => {
    if (wood >= 1000) {
        wood = 0;
        workers = 0;
        prestigeBonus += 1;
        showNotification(`🔁 Престиж! Новый бонус: +${prestigeBonus} за клик`);
        updateDisplay();
        checkAchievements();
    } else {
        showNotification('❌ Нужно 1000 дерева для престижа!');
    }
});

fullResetBtn.addEventListener('click', () => {
    wood = 0;
    workers = 0;
    prestigeBonus = 0;
    unlockedAchievements = {};
    localStorage.clear();
    showNotification('🧹 Прогресс сброшен!');
    updateDisplay();
    renderAchievements();
});

function renderAchievements() {
    achievementsList.innerHTML = "";
    achievements.forEach(a => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${a.icon}</span> ${a.name} ${unlockedAchievements[a.id] ? "✅" : "❌"}`;
        achievementsList.appendChild(li);
    });
}

function updateDisplay() {
    woodEl.textContent = wood;
    workersEl.textContent = workers;
    woodPerSecondEl.textContent = workers * (1 + prestigeBonus);
    localStorage.setItem('wood', wood);
    localStorage.setItem('workers', workers);
    localStorage.setItem('prestigeBonus', prestigeBonus);
    localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
}

setInterval(() => {
    wood += workers * (1 + prestigeBonus);
    updateDisplay();
    checkAchievements();
}, 1000);

updateDisplay();
renderAchievements();
