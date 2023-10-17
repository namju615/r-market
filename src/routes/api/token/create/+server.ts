import { json, error as svelteError } from '@sveltejs/kit';
import { SupabaseInstanse } from '$lib/supabase/supabaseService';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: { request: Request }) {
	// TODO: 현재 로그인 상태인지 확인

	const { user_id, token_value } = await request.json();

	const { data, error, status } = await SupabaseInstanse()
		.getClient()
		.from('token')
		.insert({ user_id, token_value })
		.select();

	if (error || !data) {
		throw svelteError(status, { message: error.message });
	}

	return json({ result: 'success', data });
}
