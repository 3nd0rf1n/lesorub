// Загрузка данных профиля (дерево, рабочие, время)
function loadProfile() {
  const wood = parseInt(localStorage.getItem('wood')) || 0;
  const workers = parseInt(localStorage.getItem('workers')) || 0;
  const playedTime = parseInt(localStorage.getItem('playedTime')) || 0;
  const avatar = localStorage.getItem('profileAvatar') || '';
  const banner = localStorage.getItem('profileBanner') || '';
  return { wood, workers, playedTime, avatar, banner };
}

// Формат времени
function formatPlayedTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

// Обновляем UI профиля
function updateProfileUI() {
  const profileWoodEl = document.getElementById('profileWood');
  const profileWorkersEl = document.getElementById('profileWorkers');
  const profilePlayedTimeEl = document.getElementById('profilePlayedTime');
  const avatarImg = document.getElementById('avatarImg');
  const bannerContainer = document.getElementById('bannerContainer');

  const profile = loadProfile();

  profileWoodEl.textContent = profile.wood.toLocaleString();
  profileWorkersEl.textContent = profile.workers.toLocaleString();
  profilePlayedTimeEl.textContent = formatPlayedTime(profile.playedTime);

  if (profile.avatar) {
    avatarImg.src = profile.avatar;
  } else {
    avatarImg.src = 'https://via.placeholder.com/150?text=Аватар'; // Плейсхолдер, если нет аватара
  }

  if (profile.banner) {
    bannerContainer.style.backgroundImage = `url(${profile.banner})`;
  } else {
    bannerContainer.style.backgroundImage = 'none';
    bannerContainer.style.backgroundColor = '#444';
  }
}

// Загрузка изображения и сохранение в localStorage
function handleImageUpload(inputElement, storageKey, updateCallback) {
  const file = inputElement.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    localStorage.setItem(storageKey, e.target.result);
    updateCallback();
  };
  reader.readAsDataURL(file);
}

// Удаление изображения из localStorage
function handleImageRemove(storageKey, updateCallback) {
  localStorage.removeItem(storageKey);
  updateCallback();
}

// Инициализация кнопок загрузки/удаления
function initImageControls() {
  const avatarInput = document.getElementById('avatarInput');
  const bannerInput = document.getElementById('bannerInput');

  document.getElementById('uploadAvatarBtn').addEventListener('click', () => avatarInput.click());
  avatarInput.addEventListener('change', () => handleImageUpload(avatarInput, 'profileAvatar', updateProfileUI));
  document.getElementById('removeAvatarBtn').addEventListener('click', () => handleImageRemove('profileAvatar', updateProfileUI));

  document.getElementById('uploadBannerBtn').addEventListener('click', () => bannerInput.click());
  bannerInput.addEventListener('change', () => handleImageUpload(bannerInput, 'profileBanner', updateProfileUI));
  document.getElementById('removeBannerBtn').addEventListener('click', () => handleImageRemove('profileBanner', updateProfileUI));
}

// Обновление профиля каждую секунду (включая аватар и баннер)
setInterval(updateProfileUI, 1000);

// Первый вызов при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  updateProfileUI();
  initImageControls();
});

// Получаем элементы
const nicknameModal = document.getElementById('nicknameModal');
const saveNicknameBtn = document.getElementById('saveNicknameBtn');
const nicknameInput = document.getElementById('nicknameInput');
const profileNickname = document.getElementById('profileNickname');

// Открываем модальное окно при загрузке страницы
window.onload = function() {
  // Проверяем, есть ли сохранённый ник
  const storedNickname = localStorage.getItem('nickname');
  if (storedNickname) {
    profileNickname.textContent = storedNickname;
  } else {
    nicknameModal.style.display = 'flex'; // Показываем модальное окно, если ника нет
  }
}

// Обработка нажатия на кнопку "Сохранить"
saveNicknameBtn.addEventListener('click', function() {
  const nickname = nicknameInput.value.trim();

  if (nickname) {
    // Сохраняем ник в локальном хранилище
    localStorage.setItem('nickname', nickname);

    // Отображаем ник в профиле
    profileNickname.textContent = nickname;

    // Закрываем модальное окно
    nicknameModal.style.display = 'none';
  } else {
    alert("Пожалуйста, введите ник!");
  }
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const profile = {
    nickname: localStorage.getItem('nickname') || '',
    wood: parseInt(localStorage.getItem('wood')) || 0,
    workers: parseInt(localStorage.getItem('workers')) || 0,
    playedTime: parseInt(localStorage.getItem('playedTime')) || 0,
    profileAvatar: localStorage.getItem('profileAvatar') || '',
    profileBanner: localStorage.getItem('profileBanner') || ''
  };

  // Превратим объект в JSON и закодируем в Base64 для компактности и безопасности
  const jsonStr = JSON.stringify(profile);
  const base64Str = btoa(jsonStr);

  document.getElementById('exportArea').value = base64Str;
});


