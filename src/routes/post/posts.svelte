<script lang>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import Post from './post.svelte';
	import { usePostsQuery } from '$lib/posts/graphql/query.generated';
	import { GraphQLClient } from 'graphql-request';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import IconLogo from '../../assets/icon/icon-logo.svelte';

	const gqlClient = new GraphQLClient('http://localhost:5173/graphql');
	const postsQueryResult = usePostsQuery(gqlClient);
	const { posts } = $postsQueryResult.data;

	let page = 0;
	let data = [];
	// store the new batch of data here.
	let newBatch = [];

	async function fetchData() {
		newBatch = posts;
	}

	onMount(() => {
		fetchData();
	});

	$: data = [...data, ...newBatch];
</script>

<div class="wrapper">
	<div class="header-container">
		<IconLogo />
	</div>
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

<style lang="scss">
	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		.header-container {
			height: 440px;
			width: 100%;
			background-color: #3147b1;
			margin-bottom: 80px;
			display: flex;
			justify-content: center;
			padding-top: 48px;
		}
		.posts-container {
			margin: 0 auto;
			max-width: 1200px;
			height: 60vh;
			overflow-x: scroll;
		}
	}
</style>
