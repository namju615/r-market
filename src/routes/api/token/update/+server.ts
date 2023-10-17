import { SupabaseInstanse } from '$lib/supabase/supabaseService';
import { json, error as svelteError } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: { request: Request }) {
	const { user_id, token_id, token_value } = await request.json();

	const { data, error, status } = await SupabaseInstanse()
		.getClient()
		.from('token')
		.update({ user_id, token_id, token_value })
		.select();

	if (error || !data) {
		throw svelteError(status, { message: error.message });
	}

	return json({ result: 'success', data });
}
