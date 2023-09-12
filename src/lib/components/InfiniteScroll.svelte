<script lang="ts">
	// @ts-nocheck
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	export let threshold = 0;
	export let horizontal = false;
	// export let elementScroll;
	export let hasMore = true;

	const dispatch = createEventDispatcher();
	let isLoadMore = false;
	let component;

	$: {
		if (component) {
			const element = component.parentNode;
			element.addEventListener('scroll', onScroll);
			element.addEventListener('resize', onScroll);
		}
	}

	const onScroll = (e: Event) => {
		const element = e.target;
		const offset = horizontal
			? element.scrollWidth - element.clientWidth - element.scrollLeft
			: element.scrollHeight - element.clientHeight - element.scrollTop;

		if (offset <= threshold) {
			if (!isLoadMore && hasMore) {
				dispatch('loadMore');
			}
			isLoadMore = true;
		} else {
			isLoadMore = false;
		}
	};

	onDestroy(() => {
		if (component) {
			const element = component.parentNode;

			element!.removeEventListener('scroll', null);
			element!.removeEventListener('resize', null);
		}
	});
</script>

<div bind:this={component} style="width:0px" />
