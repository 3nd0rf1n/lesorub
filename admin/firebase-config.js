import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOqsclFbwauR4XyadH1TNJys149Mx7tHI",
  authDomain: "lesorub-e022b.firebaseapp.com",
  databaseURL: "https://lesorub-e022b-default-rtdb.firebaseio.com",
  projectId: "lesorub-e022b",
  storageBucket: "lesorub-e022b.firebasestorage.app",
  messagingSenderId: "634001284128",
  appId: "1:634001284128:web:3002d6d0bc1338ff1c7045"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { auth, database, signInWithEmailAndPassword, signOut, onAuthStateChanged };

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Внутри saveUserBtn click listener, вместо saveMessage.textContent, вызываем:
saveUserBtn.addEventListener('click', () => {
  const deviceId = deviceIdInput.value.trim();
  if (!deviceId) return alert('Введите deviceID');

  const updatedData = {
    wood: Number(woodInput.value),
    workers: Number(workersInput.value),
    prestigeBonus: Number(prestigeBonusInput.value)
  };

  db.ref('users/' + deviceId).update(updatedData)
    .then(() => {
      showNotification('Данные успешно сохранены');
    })
    .catch(err => {
      showNotification('Ошибка сохранения: ' + err.message);
    });
});
