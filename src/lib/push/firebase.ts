import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, onMessage, getToken, deleteToken, type Messaging } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const isSupported = async () => {
	if (typeof navigator === 'undefined') {
		return false;
	} else {
		return Boolean(navigator.serviceWorker);
	}
};

const getServiceWorkerRegistration = async () => {
	// See also https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready
	//
	// It returns a Promise that will never reject, and which waits indefinitely until the
	// ServiceWorkerRegistration associated with the current page has an active worker
	return await navigator.serviceWorker.ready;
};

// Initialize Firebase Messaging
let messaging: Messaging;
const initializeMessaging = async () => {
	if (!messaging && !getApps().length) {
		const app = initializeApp(firebaseConfig);
		messaging = getMessaging(app);
		console.log('firebase app initialized 🌱');

		const registration = await getServiceWorkerRegistration();

		onMessage(messaging, (message) => {
			console.log('onMessage', message);
			if (registration && registration.showNotification) {
				// const { title, body } = message.notification || {};
				const { title, body } = message.data || {};

				if (title) {
					const options: { body: string } = { body: '' };
					if (body) options.body = body;
					registration.showNotification(title, options);
				}
			}
		});
	}

	return {
		getToken(options: ServiceWorkerRegistration) {
			return getToken(messaging, {
				serviceWorkerRegistration: options,
				vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
			});
		},
		deleteToken() {
			return deleteToken(messaging);
		},
	};
};

export { isSupported, initializeMessaging, getServiceWorkerRegistration };
