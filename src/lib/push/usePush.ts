import useToken from '$lib/push/useToken';
import { isSupported, initializeMessaging, getServiceWorkerRegistration } from '$lib/push/firebase';
import { get, writable } from 'svelte/store';

const localStorageKey = 'PUSH_INTENTION_ID';

export const getIntention = () => {
	if (typeof window !== 'undefined') {
		const item = localStorage.getItem(localStorageKey);
		if (item) {
			try {
				return JSON.parse(item).value;
			} catch (error) {
				console.log(error);
			}
		}
		return null;
	}
};

const setIntention = (value: string) => {
	if (typeof window !== 'undefined') {
		if (!value) {
			localStorage.removeItem(localStorageKey);
		} else {
			localStorage.setItem(localStorageKey, JSON.stringify({ value }));
		}
	}
};

const usePush = () => {
	const isLoggedIn = true;
	const { syncToken } = useToken();

	const intentionStore = () => {
		const { set, subscribe } = writable(getIntention());

		return {
			subscribe,
			set: (value: string | boolean | null) => {
				set(value);
				setIntention(String(value));
			},
		};
	};

	const intentionState = intentionStore();
	const tokenState = writable('');

	const enable = async () => {
		if (!isSupported()) return;
		const { getToken } = await initializeMessaging();
		const serviceWorkerRegistration = await getServiceWorkerRegistration();
		console.log(serviceWorkerRegistration);

		try {
			const token = await getToken(serviceWorkerRegistration);
			const { result, data } = await syncToken(token);

			if (result === 'created') {
				tokenState.set(token);
				intentionState.set(String(data?.token_id));
			}
			return { result, data };
		} catch (error: any) {
			if (error.code === 'messaging/notifications-blocked' || error.code === 'messaging/permission-blocked') {
				console.log(error.code);
				intentionState.set(false);
				tokenState.set('');
			} else if (error.code === 'messaging-permission-default') {
				// they clicked “Not Now” (at least in Firefox)
				intentionState.set(null);
			} else {
				throw error;
			}

			tokenState.set('');
			return { result: 'creation-failed', data: null };
		}
	};

	const disable = async () => {
		console.log('disable');
		if (!isSupported()) return;

		intentionState.set(false);
		return await deleteToken();
	};

	const deleteToken = async () => {
		if (!isSupported()) return;

		// if (get(tokenState)) {
		const { deleteToken } = await initializeMessaging();
		const result = await deleteToken();
		if (result) {
			tokenState.set('');
		}
		return result;
		// }
	};

	const initialize = async () => {
		console.log('initialize');
		if (!isSupported()) return;

		if (typeof get(intentionState) === 'string') {
			await enable();
			const registration = await getServiceWorkerRegistration();
			await registration.update();
		} else if (get(intentionState) === false) {
			await disable();
		}
	};

	if (isLoggedIn === true) {
		initialize();
	}

	return {
		enable,
		disable,
		deleteToken,
		initialize,
		getIntention,
	};
};

export default usePush;
