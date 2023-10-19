import { SupabaseInstanse } from '$lib/supabase/supabaseService';
import type { IPost } from '$lib/types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';

const getPagination = (page: number, size: number) => {
	const limit = size ? +size : 3;
	const from = page ? page * limit : 0;
	const to = page ? from + size - 1 : size - 1;

	return { from, to };
};

// let posts: PostgrestSingleResponse<any[]> | { data: [] } = { data: [] };

// export default posts;

export const posts = async (page: number) => {
	let posts;
	const { from, to } = getPagination(page, 14);

	posts = await SupabaseInstanse()
		.getClient()
		.from('posts')
		.select('*, member(email, name, user_id)', { count: 'exact' })
		.order('update_date', { ascending: true })
		.range(from, to < 33 ? to : 33);

	// console.log(posts);
	return posts || [];
};
