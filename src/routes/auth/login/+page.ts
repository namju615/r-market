import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load = (async ({ route, data }: { route: { id: string }; data: any }) => {
	if (route.id === '/auth/login') {
		if (data.data?.url) {
			window.location.href = data.data.url;
		}
		return;
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;
