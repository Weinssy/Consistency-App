// Firebase Cloud Messaging Service Worker for Consistent Habit (MonoRoutine)
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const defaultFirebaseConfig = {
  apiKey: "AIzaSyD-sample_consistent_habit_key",
  authDomain: "consistent-habit-app.firebaseapp.com",
  projectId: "consistent-habit-app",
  storageBucket: "consistent-habit-app.appspot.com",
  messagingSenderId: "445682163672",
  appId: "1:445682163672:web:a1b2c3d4e5f67890"
};

try {
  firebase.initializeApp(defaultFirebaseConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Background message received:', payload);
    const notificationTitle = payload.notification?.title || payload.data?.title || 'Consistent Habit Pengingat';
    const notificationOptions = {
      body: payload.notification?.body || payload.data?.body || 'Waktunya menjalankan rutinitas atau menyelesaikan tugas Anda.',
      icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%200%2032%2032%22><rect width=%2232%22 height=%2232%22 fill=%22%23E60012%22/><text x=%2216%22 y=%2222%22 font-family=%22sans-serif%22 font-size=%2214%22 font-weight=%22bold%22 text-anchor=%22middle%22 fill=%22white%22>CH</text></svg>',
      badge: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%200%2032%2032%22><rect width=%2232%22 height=%2232%22 fill=%22%23111111%22/><text x=%2216%22 y=%2222%22 font-family=%22sans-serif%22 font-size=%2214%22 font-weight=%22bold%22 text-anchor=%22middle%22 fill=%22white%22>CH</text></svg>',
      vibrate: [300, 100, 300, 100, 500],
      tag: payload.data?.tag || 'routine-deadline-alert',
      renotify: true,
      data: payload.data || {}
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (e) {
  console.log('[firebase-messaging-sw.js] Firebase init error:', e);
}

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
