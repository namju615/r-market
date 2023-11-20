import { SupabaseInstanse } from '$lib/supabase/supabaseService';

// request id = 18 post data
export const getPostInfo = async (id: number) => {
	const postInfo = await SupabaseInstanse()
		.getClient()
		.from('posts')
		.select('*, member(email, name, member_id)', { count: 'exact' })
		.eq('post_id', id);

	return postInfo || [];
};
