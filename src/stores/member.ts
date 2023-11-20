import { writable } from 'svelte/store';

// interface IMemberInfo {
// 	member_id: number;
// 	uuid: string;
// 	email: string;
// 	name: string;
// 	create_date: string;
// 	manager_flag: boolean;
// 	notification_flag: boolean;
// 	profile_image_url?: string;
// 	score?: number;
// }

function createMember() {
	const { subscribe, set, update } = writable(null);

	return {
		subscribe,
		login: (info: any) => update(() => info),
		update: (info: any) =>
			update((prev: any) => {
				return { ...prev, ...info };
			}),
		logout: () => set(null),
	};
}

export const member = createMember();
