const loginBtn = document.getElementById('loginBtn');
const welcomeMsg = document.getElementById('welcomeMsg');

document.getElementById('faqBtn').addEventListener('click', () => {
  window.location.href = 'faq.html';
});

document.getElementById('startGameBtn').addEventListener('click', () => {
  window.location.href = 'menu.html';
});

document.getElementById('settingsBtn').addEventListener('click', () => {
  window.location.href = 'settings.html';
});

document.getElementById('shopBtn').addEventListener('click', () => {
  alert('Открываем магазин...');
});

// Вход через Google
loginBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      welcomeMsg.textContent = `Привет, ${user.displayName}!`;
      console.log('Пользователь вошёл:', user);
      loadUserData(user.uid);
    })
    .catch(error => {
      console.error('Ошибка входа:', error);
      alert('Ошибка входа: ' + error.message);
    });
});

// Отслеживание изменений статуса пользователя
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    welcomeMsg.textContent = `Привет, ${user.displayName}!`;
    loadUserData(user.uid);
  } else {
    welcomeMsg.textContent = '';
  }
});

// Загрузка данных пользователя из базы
async function loadUserData(uid) {
  try {
    const userRef = firebase.database().ref('users/' + uid);
    const snapshot = await userRef.get();
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Здесь нужно определить переменные wood, workers и др., или вставить свою логику
      wood = data.wood || 0;
      workers = data.workers || 0;
      prestigeBonus = data.prestigeBonus || 0;
      unlockedAchievements = data.achievements || [];
      workerPrice = data.workerPrice || 50;
      updateDisplay();
      checkAchievements();
      saveProgressToFirebase();
    } else {
      saveProgressToFirebase();
    }
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
}

// Сохранение прогресса пользователя в базу
function saveProgressToFirebase() {
  const user = firebase.auth().currentUser;
  if (user) {
    const uid = user.uid;
    firebase.database().ref('users/' + uid).set({
      wood,
      workers,
      prestigeBonus,
      achievements: unlockedAchievements,
      workerPrice
    });
  }
}
