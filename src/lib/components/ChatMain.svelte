<script lang="ts">
	import { GraphQLClient } from 'graphql-request';
	import type { IGetChatMessageQuery } from '$lib/chat/graphql/query.generated';
	import { afterUpdate, onMount } from 'svelte';
	import { socket } from '$lib/chat';
	import dayjs from 'dayjs';
	import { Avatar } from 'flowbite-svelte';
	import SendIcon from './icons/SendIcon.svelte';
	import ImageIcon from './icons/ImageIcon.svelte';
	import { useAddChatMessageMutation } from '$lib/chat/graphql/mutation.generated';
	import { member } from '../../stores/member';

	export let data: IGetChatMessageQuery;
	export let room_id: number;
	const gqlClient = new GraphQLClient('http://localhost:5173/graphql');
	const memberId = $member?.member_id;
	const userNm = $member?.name;
	const profileImg = $member?.profile_image_url;

	let textfield = '';
	let chatContainer: HTMLDivElement;
	$: messages = data.getChatMessage || [];
	const mutation = useAddChatMessageMutation(gqlClient, {
		onSuccess: (data) => {
			socket.emit('new_message', data.addChatMessage.contents, room_id, userNm, memberId, profileImg, () => {
				addMessage(data.addChatMessage.contents);
			}); // Send the message
			socket.emit('refetch_room_list'); // refetch chat list
		},
	});

	async function scrollToBottom(node: HTMLDivElement) {
		node.scroll({ top: node.scrollHeight });
	}

	function addMessage(message: string, isNotice: boolean = false) {
		{
			if (isNotice) {
				messages = [
					...messages,
					{
						room_id: room_id,
						member_id: -1,
						create_date: new Date().toString(),
						contents: message,
						name: 'system',
					},
				];
			} else {
				messages = [
					...messages,
					{
						room_id: room_id,
						member_id: memberId,
						create_date: new Date().toString(),
						contents: message,
						name: userNm,
						user_image: profileImg,
					},
				];
			}
		}
	}

	onMount(() => {
		socket.emit('join_room', room_id, userNm, () => {
			// socket.on('welcome', (data) => {
			// 	addMessage(`${data.name}님이 입장하셨습니다.`, true);
			// });
		});
		socket.on('new_message', (message) => {
			messages = [...messages, message];
		});
	});

	afterUpdate(() => {
		scrollToBottom(chatContainer);
	});

	async function sendMessage() {
		const message = textfield.trim();
		if (!message) return;

		textfield = '';
		await $mutation.mutate({ chat: { room_id: room_id, member_id: memberId, contents: message } });
	}
</script>

<div class="flex flex-col w-full h-full mx-auto bg-white">
	<div class="h-[32px] w-full bg-[#3147B133] flex-shrink-0 flex items-center justify-center text-[#3147B1] font-bold" />
	<div class="w-full h-[96%] px-[26px] flex flex-col justify-end">
		<div class="flex-1 overflow-y-auto" bind:this={chatContainer}>
			{#if messages}
				{#each messages as message}
					{#if message?.name === 'system'}
						<div class="w-full px-4 py-1 my-4">
							<span class="flex items-center justify-center text-sm text-gray-500">{message?.contents}</span>
						</div>
					{:else}
						<div class="flex items-top my-[12px] leading-[102%]">
							<Avatar
								src={message?.user_image?.replace('s96-c', 's164-c') ?? '/profile.jpeg'}
								class="w-[28px] h-[28px]"
							/>
							<div class="float-right px-[8px] rounded-tr-none rounded-xl w-fit">
								<div class="text-[14px] font-medium my-[1px]">{message?.name}</div>
								<div class="text-[12px] font-normal leading-normal text-[#999] mb-[4px]">
									{dayjs(message?.create_date).format('MM DD A HH:MM')}
								</div>
								<div class="text-[14px] font-medium">{message?.contents}</div>
							</div>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
		<form
			action="#"
			on:submit|preventDefault={sendMessage}
			class="flex items-center mx-[26px] py-4 shrink-0 px-0 h-[4%]"
		>
			<label class="relative block w-full text-gray-400 focus-within:text-gray-600 mr-[12px]">
				<input
					type="text"
					bind:value={textfield}
					placeholder="내용을 입력해주세요."
					class="block w-full rounded h-[48px] text-gray-500 placeholder-gray-400 bg-white border border-[#C6C6C6] appearance-none form-input focus:outline-none"
				/>
				<button class="absolute transform -translate-y-1/2 top-1/2 right-3">
					<ImageIcon />
				</button>
			</label>
			<button type="submit" class="border border-white rounded-lg shrink-0"><SendIcon /></button>
		</form>
	</div>
</div>
