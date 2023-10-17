import { writable } from 'svelte/store';

interface IToast {
	message: string;
	isOpen?: boolean;
	type?: 'success' | 'error' | null;
}

function createToast() {
	const { subscribe, update } = writable<IToast>({
		message: '',
		isOpen: false,
		type: 'error',
	});

	return {
		subscribe,
		onError: (info: IToast) => update(() => ({ type: 'error', isOpen: true, ...info })),
		onSuccess: (info: IToast) => update(() => ({ type: 'success', isOpen: true, ...info })),
		close: () => update(() => ({ isOpen: false, message: '', type: null })),
	};
}

export const toast = createToast();
