<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	onMount(() => {
		if (data.redirectUrl) {
			window.location.href = data.redirectUrl;
		}
	});
</script>
