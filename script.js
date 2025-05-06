let wood = parseInt(localStorage.getItem('wood')) || 0;
let workers = parseInt(localStorage.getItem('workers')) || 0;
let prestigeBonus = parseInt(localStorage.getItem('prestigeBonus')) || 0;

const woodEl = document.getElementById('wood');
const workersEl = document.getElementById('workers');
const woodPerSecondEl = document.getElementById('woodPerSecond');
const buyWorkerBtn = document.getElementById('buyWorker');
const resetGameBtn = document.getElementById('resetGame');
const fullResetBtn = document.getElementById('fullReset');
const notifArea = document.getElementById('notifications');

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
});

buyWorkerBtn.addEventListener('click', () => {
    if (wood >= 10) {
        wood -= 10;
        workers++;
        showNotification('👷 Рабочий нанят!');
        updateDisplay();
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
    } else {
        showNotification('❌ Нужно 1000 дерева для престижа!');
    }
});

fullResetBtn.addEventListener('click', () => {
    wood = 0;
    workers = 0;
    prestigeBonus = 0;
    showNotification('🧹 Прогресс сброшен!');
    updateDisplay();
});

function updateDisplay() {
    woodEl.textContent = wood;
    workersEl.textContent = workers;
    woodPerSecondEl.textContent = workers * (1 + prestigeBonus);
    localStorage.setItem('wood', wood);
    localStorage.setItem('workers', workers);
    localStorage.setItem('prestigeBonus', prestigeBonus);
}

setInterval(() => {
    wood += workers * (1 + prestigeBonus);
    updateDisplay();
}, 1000);

updateDisplay();