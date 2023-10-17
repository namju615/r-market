import { SupabaseInstanse } from '$lib/supabase/supabaseService';
import type { ITopicInput } from '$lib/types';

export const getToken = async ({ user_id, token_id }: { user_id: number; token_id: number }) => {
	return await SupabaseInstanse()
		.getClient()
		.from('token')
		.select('*')
		.eq('user_id', user_id)
		.eq('token_id', token_id)
		.order('created_at', { ascending: false });
};

export const getPreviousToken = async (token_value: string) => {
	return await SupabaseInstanse().getClient().from('token').select('*').eq('token_value', token_value);
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
