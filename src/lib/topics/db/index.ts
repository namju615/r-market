import { subscribeToTopic, unsubscribeToTopic } from '$lib/server/subscription';
import { SupabaseInstanse } from '$lib/supabase/supabaseService';
import { getToken } from '$lib/token/db';
import type { ITopicInput } from '$lib/types';

export const getTopics = async (user_id: number, token_id: number) => {
	const { data } = await SupabaseInstanse()
		.getClient()
		.from('topic')
		.select('*')
		.eq('user_id', user_id)
		.eq('token_id', token_id)
		.eq('use_yn', 'Y');

	return data;
};

export const subscribe = async ({ input }: { input: ITopicInput }) => {
	if (!input.user_id || !input.token_id || !input.topic_name) return [];
	let result = [];

	const previousTopic = await SupabaseInstanse()
		.getClient()
		.from('topic')
		.select()
		.eq('user_id', input.user_id)
		.eq('token_id', input.token_id)
		.eq('topic_name', input.topic_name)
		.select();

	// console.log('previousTopic', previousTopic.error);

	if (previousTopic.data?.[0]) {
		console.log('p', previousTopic);
		const updatedTopic = await SupabaseInstanse()
			.getClient()
			.from('topic')
			.update({ use_yn: 'Y', token_id: input.token_id })
			.eq('topic_id', input.topic_id)
			.select();

		result = updatedTopic.data || [];
		// console.log('updatedTopic ', updatedTopic.error);
	} else {
		const newTopic = await SupabaseInstanse().getClient().from('topic').insert(input).select();

		result = newTopic.data || [];
		// console.log('newTopic', newTopic.error);
	}

	const { data: token } = await getToken({ user_id: input.user_id, token_id: input.token_id });

	if (token) {
		const result = await subscribeToTopic(token[0].token_value, input.topic_name);
		console.log(result?.successCount, result?.errors);
	}

	return result;
};

export const unsubscribe = async ({ input }: { input: ITopicInput }) => {
	if (!input.user_id || !input.token_id || !input.topic_name) return {};
	const { topic_id } = input;
	// console.log(topic_id);

	const updateResult = await SupabaseInstanse()
		.getClient()
		.from('topic')
		.update({ use_yn: 'N' })
		.eq('topic_id', topic_id)
		.select();
	// console.log(updateResult.error);
	const { data: token } = await getToken({ user_id: input.user_id, token_id: input.token_id });

	if (token) {
		await unsubscribeToTopic(token[0].token_value, input.topic_name);
		console.log(token[0].token_value);
	}

	return updateResult;
};
