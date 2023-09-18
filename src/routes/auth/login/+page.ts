import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load = (async ({ route, data }: { route: { id: string }; data: any }) => {
	if (route.id === '/auth/login' && data.data?.url) {
		return { redirectUrl: data.data.url };
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;
