  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker-admin.js') // Используем относительный путь
      .then(registration => {
        console.log('Service Worker для админки зарегистрирован', registration);
      })
      .catch(error => {
        console.log('Ошибка регистрации Service Worker для админки:', error);
      });
  }

