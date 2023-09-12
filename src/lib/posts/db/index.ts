import { SupabaseInstanse } from '$lib/supabase/supabaseService';
import type { IPost } from '$lib/types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';

const getPagination = (page: number, size: number) => {
	const limit = size ? +size : 3;
	const from = page ? page * limit : 0;
	const to = page ? from + size - 1 : size - 1;

	return { from, to };
};
const { from, to } = getPagination(0, 3);

let posts: PostgrestSingleResponse<any[]> | { data: [] } = { data: [] };

try {
	posts = await SupabaseInstanse()
		.getClient()
		.from('posts')
		.select('*, member(email, name, user_id)', { count: 'exact' })
		.range(from, to);
} catch (error) {
	console.log('🐸', error);
}

export default posts;
