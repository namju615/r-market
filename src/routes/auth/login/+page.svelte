<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { member } from '../../../stores/member';

	export let data: PageData;
	onMount(() => {
		if ($member) {
			window.location.href = '/';
		} else {
			if (data.redirectUrl) {
				window.location.href = data.redirectUrl;
			}
		}
	});
</script>
