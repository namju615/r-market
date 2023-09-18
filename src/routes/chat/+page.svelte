<script lang="ts">
	import { GraphQLClient } from 'graphql-request';
	import type { PageData } from './$types';
	import { useGetChatMessageQuery, useGetRoomListQuery } from '$lib/chat/graphql/query.generated';
	import ChatList from '$lib/components/ChatList.svelte';
	import ChatMain from '$lib/components/ChatMain.svelte';
	import ChevronIcon from '$lib/components/icons/ChevronIcon.svelte';

	export let data: PageData;
	let activeRoomId: number | undefined = undefined;
	let isOpen = true;
	const MY_USER_ID = 1;

	const gqlClient = new GraphQLClient('http://localhost:5173/graphql');

	$: chatListResult = useGetRoomListQuery(gqlClient, { user_id: MY_USER_ID });
	$: chatMessageResult = useGetChatMessageQuery(
		gqlClient,
		{ room_id: Number(activeRoomId) },
		{
			enabled: !!activeRoomId,
		},
	);
	$: chatList = $chatListResult.data! || {};
	$: chatMessage = $chatMessageResult.data! || {};
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

{#if chatListResult}
	<ChatList data={chatList} {isOpen} onClick={(room_id) => (activeRoomId = room_id)} />
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:click={(e) => {
			isOpen = !isOpen;
		}}
		class="flex items-center h-full border-r-[3px] border-[#3147B11A]"
	>
		<ChevronIcon direction={isOpen ? 'left' : 'right'} />
	</div>
	{#if activeRoomId}
		<ChatMain data={chatMessage} room_id={activeRoomId} />
	{/if}
{/if}
