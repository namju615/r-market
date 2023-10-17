<script lang="ts">
	import { GraphQLClient } from 'graphql-request';
	import usePush from '$lib/push/usePush';
	import { useSubscribeMutation, useUnsubscribeMutation } from '$lib/topics/graphql/mutation.generated';
	import type { ITopicInput, ITopicsWithToken } from '$lib/types';
	import { useTopicsQuery } from '$lib/topics/graphql/query.generated';
	import { toast } from '../../stores/toast';

	const initialSubInfo = { topics: [], token: null };

	const gqlClient = new GraphQLClient('http://localhost:5173/graphql');

	const subscribeMutationResult = useSubscribeMutation(gqlClient);
	const unsubscribeMutationResult = useUnsubscribeMutation(gqlClient);

	const { mutate: subscribeToTopic } = $subscribeMutationResult!;
	const { mutate: unsubscribeToTopic } = $unsubscribeMutationResult!;

	const { enable, disable, getIntention } = usePush();

	let token_id = getIntention();
	const topicsQueryResult = useTopicsQuery(
		gqlClient,
		{ user_id: 1, token_id: Number(token_id) },
		{ enabled: !!token_id },
	);

	$: subInfo = $topicsQueryResult.data?.topicWithToken! || initialSubInfo;
	$: refetch = $topicsQueryResult.refetch!;
	$: token_id = subInfo?.token?.token_value;

	const getSubscribeStatus = (topic: string, subInfo: ITopicsWithToken) => {
		if (getIntention()) {
			return subInfo?.topics?.filter((item) => item?.topic_name === topic).length > 0;
		}
		return false;
	};

	let post_reply_yn = false;
	let chat_message_yn = false;
	let keyword_triggered_post_update_yn = false;

	const updateSubscriptionStatus = () => {
		post_reply_yn = getSubscribeStatus('post-reply', subInfo);
		chat_message_yn = getSubscribeStatus('chat-message', subInfo);
		keyword_triggered_post_update_yn = getSubscribeStatus('keyword-triggered-post-update', subInfo);
	};

	$: {
		if ($topicsQueryResult) updateSubscriptionStatus();
	}

	const togglePushStatus = async (checked: boolean, topic: string) => {
		if (checked) {
			const response = await enable();

			if (response) {
				const { result, data } = response;
				if (result !== 'creation-failed') {
					console.log('token create result', data);
					const input: ITopicInput = {
						user_id: 1,
						topic_name: topic,
						use_yn: 'Y',
						token_id: data ? data.token_id : subInfo?.token?.token_id,
					};
					subscribeToTopic({ input });
				} else {
					toast.onError({
						message: 'PUSH 알람 설정에 실패했습니다',
					});
				}
			}
		} else {
			const result = await disable();
			const currentTopic = subInfo?.topics?.filter((item) => item?.topic_name === topic) || [];
			console.log('push disabled', result, currentTopic);

			if (result && currentTopic[0]) {
				let topic_id = Number(currentTopic[0]?.topic_id);

				const input: ITopicInput = {
					user_id: 1,
					topic_name: topic,
					use_yn: 'N',
					topic_id,
					token_id: subInfo?.token?.token_id,
				};

				unsubscribeToTopic({ input });
				refetch();
			} else {
				toast.onError({
					message: 'PUSH 알람 해제에 실패했습니다',
				});
			}
		}
	};
	const BadgeCss =
		"w-[47px] h-[25px] bg-white border border-[#3147B1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-[#3147B1] after:border-[#3147B1] after:rounded-full after:h-[19px] after:w-[19px] after:transition-all peer-checked:bg-white";
</script>

<div class="pt-5">
	<div>
		<label class="relative inline-flex items-center mb-5 cursor-pointer">
			<input
				type="checkbox"
				bind:checked={post_reply_yn}
				on:change={() => togglePushStatus(post_reply_yn, 'post-reply')}
				class="sr-only peer"
			/>
			<div class={BadgeCss} />
			<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">새 댓글 알림</span>
		</label>
	</div>

	<div>
		<label class="relative inline-flex items-center mb-5 cursor-pointer">
			<input
				type="checkbox"
				bind:checked={keyword_triggered_post_update_yn}
				on:change={() => togglePushStatus(keyword_triggered_post_update_yn, 'keyword-triggered-post-update')}
				class="sr-only peer"
			/>
			<div class={BadgeCss} />
			<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">키워드 알림</span>
		</label>
	</div>

	<div>
		<label class="relative inline-flex items-center mb-5 cursor-pointer">
			<input
				type="checkbox"
				bind:checked={chat_message_yn}
				on:change={() => togglePushStatus(chat_message_yn, 'chat-message')}
				class="sr-only peer"
			/>
			<div class={BadgeCss} />
			<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">채팅 알림</span>
		</label>
	</div>
</div>
