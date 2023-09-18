import { AuthInstanse } from '$lib/auth/authService';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return await AuthInstanse().signInOAuth();
}) satisfies PageServerLoad;
