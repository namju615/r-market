<script lang>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import Post from './post.svelte';
	import { usePostsQuery } from '$lib/posts/graphql/query.generated';
	import { GraphQLClient } from 'graphql-request';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';

	const gqlClient = new GraphQLClient('http://localhost:5173/graphql');
	const postsQueryResult = usePostsQuery(gqlClient);
	const { posts } = $postsQueryResult.data;

	let page = 0;
	let data = [];
	// store the new batch of data here.
	let newBatch = [];

	async function fetchData() {
		newBatch = posts;
		// console.log('🍄', newBatch);
	}

	onMount(() => {
		fetchData();
	});

	$: data = [...data, ...newBatch];
</script>

<div>
	<div class="header-container" />
	<div class="posts-container flex flex-wrap justify-center">
		{#each data as post}
			<Post {post} />
		{:else}
			<p>데이터가 없습니다.</p>
		{/each}
		<InfiniteScroll
			hasMore={newBatch.length}
			threshold={100}
			on:loadMore={() => {
				fetchData();
			}}
		/>
	</div>
</div>

<style>
	.header-container {
		height: 460px;
	}
	.posts-container {
		max-width: 1200px;
		height: 60vh;
		overflow-x: scroll;
	}
</style>
