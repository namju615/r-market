import { SupabaseInstanse } from '$lib/supabase/supabaseService';
import { json, error as svelteError } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request }: { request: Request }) {
	// TODO: 현재 로그인 상태인지 확인

	console.log(request);
	const supabase = SupabaseInstanse().getClient();
	const { data, error, status } = await supabase.from('token').select().order('created_at', { ascending: false });
	if (error || !data) {
		throw svelteError(status, { message: error.message });
	}

	return json({ result: 'success', token: data[0] });
}
