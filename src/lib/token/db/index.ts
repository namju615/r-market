import { SupabaseInstanse } from '$lib/supabase/supabaseService';
import type { ITopicInput } from '$lib/types';

export const getToken = async (user_id: number) => {
	return await SupabaseInstanse()
		.getClient()
		.from('token')
		.select('*')
		.eq('user_id', user_id)
		.order('created_at', { ascending: false });
};

export const getLatestToken = async (user_id: number) => {
	return await SupabaseInstanse()
		.getClient()
		.from('token')
		.select('*')
		.eq('user_id', user_id)
		.order('created_at', { ascending: false })
		.range(0, 0);
};

export const createToken = async ({ input }: { input: ITopicInput }) => {
	const result = await SupabaseInstanse().getClient().from('token').insert(input).select();
	console.log(result);

	return result;
};

export const updateToken = async ({ input }: { input: ITopicInput }) => {
	const result = await SupabaseInstanse().getClient().from('token').update(input).select();
	console.log(result);

	return result;
};
