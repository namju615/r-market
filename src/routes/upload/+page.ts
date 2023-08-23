import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load = (async ({ route }: { route: { id: string } }) => {
	if (route.id === '/upload') {
		return {
			title: 'upload'
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;
