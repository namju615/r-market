import { getPreviousToken } from '$lib/token/db';
import { json, error as svelteError } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	// TODO: 현재 로그인 상태인지 확인
	const token_value = url.searchParams.get('value') as string;
	const { data, error, status } = await getPreviousToken(token_value);

	if (error || !data) {
		throw svelteError(status, { message: error.message });
	}

	return json({ result: 'success', data });
}
