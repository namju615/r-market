<script lang="ts">
	import { onMount } from 'svelte';
	import Push from '$lib/components/Push.svelte';
	// import SendButton from '$lib/components/SendButton.svelte';
	import type { PageData } from './$types';
	import KeywordBadge from '$lib/components/KeywordBadge.svelte';

	export let data: PageData;

	let init = false;

	const userKeywords: string[] = ['드라이기', '핸드폰', '키보드', '닌텐도'];

	onMount(() => {
		init = true;
	});
</script>

<div class="container mx-auto px-20">
	<div class="divide-y divide-[#C6C6C6]">
		<p class="text-base mb-3 text-[#333003] font-bold">키워드 등록</p>
		<div class="pt-5">
			<form class="flex items-center">
				<input
					type="text"
					id="keyword"
					name="keyword"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-1/2 h-11 pl-3 p-2.5 mr-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="키워드를 입력하세요"
					required
				/>

				<button
					type="submit"
					class="w-24 p-2.5 text-sm font-medium text-white bg-[#3147B1] rounded-sm border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					검색
				</button>
			</form>
			<div class="my-[19px]">
				<KeywordBadge keywords={userKeywords} />
			</div>
		</div>
		<div class="mb-[50px]" />
	</div>

	<div class="divide-y divide-[#C6C6C6]">
		{#if init}
			<p class="text-base mb-3 text-[#333003] font-bold">PUSH 알림 설정</p>
			<Push />

			<!-- 전송 테스트 -->
			<!-- <SendButton /> -->
		{/if}
	</div>
</div>
