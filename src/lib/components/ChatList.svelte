<script lang="ts">
	import type { IGetRoomListQuery } from '$lib/chat/graphql/query.generated';
	import { Gallery } from 'flowbite-svelte';
	import MoreIcon from './icons/MoreIcon.svelte';
	import dayjs from 'dayjs';
	export let data: IGetRoomListQuery;
	export let isOpen: boolean;
	export let onClick: (room_id: number | undefined) => void;

	const MY_USER_ID = 1;

	const getRoomImage = (user_list: Array<{ name: string; member_id: number; user_image?: string | null }>) => {
		if (user_list.length > 2) {
			return user_list.slice(0, 4).map((user) => ({ src: user.user_image ?? '/profile.jpeg', alt: user.name }));
		} else if (user_list.length > 1) {
			return user_list
				.filter((v) => v.member_id !== MY_USER_ID)
				.map((user) => ({ src: user.user_image ?? '/profile.jpeg', alt: user.name }));
		}
	};

	$: roomList = data.getRoomList?.map((item) => {
		const room_image = item?.user_list
			? getRoomImage(item.user_list)
			: [{ src: '/profile.jpeg' ?? '', alt: 'default' }];
		return { ...item, room_image };
	});

	function handleKeyDown(event: KeyboardEvent) {}

	function getGapTime(date: string) {
		const gap_min = dayjs().diff(date, 'minute');
		if (gap_min > 1440) {
			return Math.floor(gap_min / 1440) + '일 전';
		} else if (gap_min > 60) {
			return Math.floor(gap_min / 60) + '시간 전';
		} else {
			return gap_min + '분 전';
		}
	}
</script>

{#if isOpen}
	<div class="h-full border-[#3147B11A] border-[1px] left-0">
		<div
			class="h-[32px] bg-[#3147B133] w-[296px] flex-shrink-0 flex items-center justify-center text-[#3147B1] font-bold"
		>
			채팅목록
		</div>

		{#if roomList}
			{#each roomList as room}
				<div
					class="h-[103px] border-b border-[#3147B11A] hover:bg-slate-100"
					role="button"
					tabindex={0}
					on:keydown={handleKeyDown}
					on:click={() => onClick(room.room_id)}
				>
					<div class="flex">
						<Gallery
							items={room.room_image}
							class={`h-[48px] w-[48px] overflow-hidden gap-0 ml-[15px] mt-[24px] ${
								room.room_image?.length && room.room_image?.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
							}`}
							let:item
						>
							<img src={item.src} alt={item.alt} class="w-full p-0 m-0 rounded-full" />
						</Gallery>
						<div class="mt-[24px] ml-[8px]">
							<div class="text-[14px]">{room?.user_list?.map((user) => user.name).join(', ')}</div>
							<div class="text-[12px] mt-[4px]">{room?.last_message ?? ''}</div>
							<div class="text-[12px] text-[#999]">{room?.post_title ?? ''}</div>
						</div>
						<div class="mt-[27px] ml-auto mr-[12px]">
							<div class="flex">
								<div class="text-[10px] text-[#999]">{getGapTime(room?.last_message_date ?? '')}</div>
								<div class="ml-[10px]">
									<MoreIcon />
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
{/if}
