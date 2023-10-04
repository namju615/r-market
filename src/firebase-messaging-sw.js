/// <reference types="@sveltejs/kit" />

import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

self.addEventListener('install', () => {
	console.log('FCM service-worker installed');
	self.skipWaiting();
});

self.addEventListener('activate', () => {
	console.log('FCM service-worker activated');
});

onBackgroundMessage(messaging, (payload) => {
	console.log('[firebase-messaging-sw.js] Received background message', payload);
	if (!payload.data) return 'No data';

	const { title, body, icon, ...restPayload } = payload.data;
	const notificationOptions = {
		body,
		icon: icon || '',
		data: restPayload,
	};
	console.log(title, notificationOptions);
	return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
	const url = '/';
	event.notification.close();
	event.waitUntil(self.clients.openWindow(url));
});
