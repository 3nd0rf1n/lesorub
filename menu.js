// Инициализация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBxBkAjiy55DO7UBKltpxeagqzTIG7whSM",
  authDomain: "lesorubik-b8937.firebaseapp.com",
  projectId: "lesorubik-b8937",
  storageBucket: "lesorubik-b8937.firebasestorage.app",
  messagingSenderId: "587896530691",
  appId: "1:587896530691:web:bcf53cb37468ca66fd6b36",
  measurementId: "G-0B3DH2DM1E"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

let isLoggedIn = false;
let progressLoaded = false;

function ShowNotification(message) {
  const container = document.getElementById('notification-container');
  if (!container) return;

  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = message;
  container.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 3400);
}

function loadProgress(uid) {
  const dbRef = firebase.database().ref('users/' + uid + '/progress');
  return dbRef.once('value')
    .then(snapshot => {
      const progress = snapshot.val() || {};
      localStorage.setItem('progress', JSON.stringify(progress));
      ShowNotification('Прогресс загружен!');
      progressLoaded = true;
    })
    .catch(error => {
      ShowNotification('Ошибка загрузки прогресса: ' + error.message);
      progressLoaded = false;
    });
}


document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const startGameBtn = document.getElementById('startGameBtn');
  const welcomeMsg = document.getElementById('welcomeMsg');
  const faqBtn = document.getElementById('faqBtn');

  loginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(() => {
        // onAuthStateChanged обработает состояние
      })
      .catch((error) => {
        ShowNotification('Ошибка входа: ' + error.message);
      });
  });

  logoutBtn.addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        ShowNotification('Вы вышли из аккаунта');
      })
      .catch((error) => {
        ShowNotification('Ошибка выхода: ' + error.message);
      });
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      isLoggedIn = true;
      welcomeMsg.textContent = `Привет, ${user.displayName}!`;
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';

      loadProgress(user.uid);
    } else {
      isLoggedIn = false;
      progressLoaded = false;
      welcomeMsg.textContent = '';
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
    }
  });

  startGameBtn.addEventListener('click', (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      ShowNotification('Войдите сначала в аккаунт');
      return;
    }
    if (!progressLoaded) {
      e.preventDefault();
      ShowNotification('Прогресс еще не загружен, подождите...');
      return;
    }
    window.location.href = 'menu.html';
  });

  faqBtn.addEventListener('click', () => {
    window.location.href = 'faq.html';
  });
});


