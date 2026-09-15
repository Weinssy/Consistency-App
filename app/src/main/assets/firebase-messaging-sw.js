// Firebase Cloud Messaging Service Worker for MonoRoutine
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const defaultFirebaseConfig = {
  apiKey: "AIzaSyD-sample_monoroutine_key",
  authDomain: "monoroutine-app.firebaseapp.com",
  projectId: "monoroutine-app",
  storageBucket: "monoroutine-app.appspot.com",
  messagingSenderId: "445682163672",
  appId: "1:445682163672:web:a1b2c3d4e5f67890"
};

try {
  firebase.initializeApp(defaultFirebaseConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Background message received:', payload);
    const notificationTitle = payload.notification?.title || payload.data?.title || 'MonoRoutine Pengingat';
    const notificationOptions = {
      body: payload.notification?.body || payload.data?.body || 'Waktunya menjalankan rutinitas atau menyelesaikan tugas Anda.',
      icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%200%20512%20512%22><rect width=%22512%22 height=%22512%22 rx=%22100%22 fill=%22%23171717%22/><path d=%22M120%20392V120H184L256%20272L328%20120H392V392H336V224L268%20364H244L176%20224V392H120Z%22 fill=%22%23ffffff%22/><path d=%22M296%20330L348%20382L440%20286%22 stroke=%22%23ffffff%22 stroke-width=%2232%22 stroke-linecap=%22square%22 stroke-linejoin=%22miter%22 fill=%22none%22/></svg>',
      badge: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%200%20512%20512%22><rect width=%22512%22 height=%22512%22 rx=%22100%22 fill=%22%23171717%22/><path d=%22M120%20392V120H184L256%20272L328%20120H392V392H336V224L268%20364H244L176%20224V392H120Z%22 fill=%22%23ffffff%22/></svg>',
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
