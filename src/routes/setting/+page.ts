import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load = (async ({ route }: { route: { id: string } }) => {
	if (route.id === '/setting') {
		return {
			title: 'setting',
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;
