<script lang="ts">
	import { GraphQLClient } from 'graphql-request';
	import type { PageData } from './$types';
	import { useGetChatMessageQuery, useGetRoomListQuery } from '$lib/chat/graphql/query.generated';
	import ChatList from '$lib/components/ChatList.svelte';
	import ChatMain from '$lib/components/ChatMain.svelte';
	import ChevronIcon from '$lib/components/icons/ChevronIcon.svelte';
	import { onMount } from 'svelte';
	import { socket } from '$lib/chat';
	import { member } from '../../stores/member';

	export let data: PageData;
	let activeRoomId: number | undefined = undefined;
	let isOpen = true;
	$: member_id = $member?.member_id;

	const gqlClient = new GraphQLClient('http://localhost:5173/graphql');
	$: chatListResult = useGetRoomListQuery(gqlClient, { member_id }, { enabled: !!member_id });
	$: chatMessageResult = useGetChatMessageQuery(
		gqlClient,
		{ room_id: Number(activeRoomId) },
		{
			enabled: !!activeRoomId,
		},
	);

	onMount(async () => {
		await socket.on('refetch_room_list', () => {
			$chatListResult.refetch();
		});
	});

	function handleKeyDown(event: KeyboardEvent) {}

	$: chatList = $chatListResult.data! || {};
	$: chatMessage = $chatMessageResult.data! || {};
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

{#if chatListResult}
	<ChatList
		data={chatList}
		{isOpen}
		onClick={(room_id) => {
			activeRoomId = room_id;
			$chatMessageResult.refetch();
		}}
	/>
	<div
		on:click={(e) => {
			isOpen = !isOpen;
		}}
		on:keydown={handleKeyDown}
		class="flex items-center h-full border-r-[3px] border-[#3147B11A]"
	>
		<ChevronIcon direction={isOpen ? 'left' : 'right'} />
	</div>
	{#if activeRoomId}
		<ChatMain data={chatMessage} room_id={activeRoomId} />
	{/if}
{/if}
