<script lang="ts">
	export let keywords: string[];
</script>

{#each keywords as keyword}<span
		id="keyword-badge"
		class="inline-flex items-center px-3 mr-2 my-0.5 text-xs font-normal text-white bg-[#999999] border border-[#888888] rounded-[34px] h-[22px] min-w-[87.5px] leading-[17.38px]"
	>
		{keyword}
		<button
			type="button"
			class="inline-flex items-center p-1 ml-1 text-xs text-white bg-transparent rounded-[34px] hover:bg-[#888888] hover:text-white"
			data-dismiss-target="#keyword-badge"
			aria-label="Remove"
		>
			<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 0.75L10.5 10.25" stroke="#DDDDDD" />
				<path d="M10.5 0.75L1 10.25" stroke="#DDDDDD" />
			</svg>

			<span class="sr-only">Remove badge</span>
		</button>
	</span>{/each}
