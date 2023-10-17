import { json, error as svelteError } from '@sveltejs/kit';
import { SupabaseInstanse } from '$lib/supabase/supabaseService';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }: { request: Request }) {
	const { token_id, user_id } = await request.json();

	const { data, error, status } = await SupabaseInstanse()
		.getClient()
		.from('token')
		.delete()
		.eq('token_id', token_id)
		.eq('user_id', user_id);

	if (error || !data) {
		throw svelteError(status, { message: error?.message || '' });
	}

	return json({ result: 'success', data });
}
