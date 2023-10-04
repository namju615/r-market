import { subscribeToTopic, unsubscribeToTopic } from '$lib/server/subscription';
import { SupabaseInstanse } from '$lib/supabase/supabaseService';
import { getToken } from '$lib/token/db';
import type { ITopicInput } from '$lib/types';

export const getTopics = async (user_id: number) => {
	const { data } = await SupabaseInstanse()
		.getClient()
		.from('topic')
		.select('*')
		.eq('user_id', user_id)
		.eq('use_yn', 'Y');
	return data;
};

export const subscribe = async ({ input }: { input: ITopicInput }) => {
	const { data } = await SupabaseInstanse().getClient().from('topic').insert(input).select();

	const { data: token } = await getToken(input.user_id);

	if (token) {
		const result = await subscribeToTopic(token[0].token_value, input.topic_name);
		console.log(result);
	}

	return data;
};

export const unsubscribe = async ({ input }: { input: ITopicInput }) => {
	const { topic_id, ...resetData } = input;

	const updateResult = await SupabaseInstanse()
		.getClient()
		.from('topic')
		.update(resetData)
		.eq('topic_id', topic_id)
		.select();

	const { data: token } = await getToken(input.user_id);
	if (token) {
		const result = await unsubscribeToTopic(token[0].token_value, input.topic_name);
		console.log(token[0].token_value);
	}

	return updateResult;
};
