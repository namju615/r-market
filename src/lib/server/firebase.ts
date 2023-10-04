import { credential } from 'firebase-admin';
import { initializeApp, getApps } from 'firebase-admin/app';

const initFirebaseServer = () => {
	if (getApps().length === 0) {
		try {
			initializeApp({
				credential: credential.cert({
					projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
					clientEmail: import.meta.env.VITE_FIREBASE_CLIENT_EMAIL,
					privateKey: import.meta.env.VITE_FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
				}),
			});
		} catch (error) {
			console.log('Firebase App Initialization fail', error);
		}
	}
};

export default initFirebaseServer;
