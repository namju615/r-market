<script lang>
	// @ts-nocheck
	import { onMount, beforeUpdate } from 'svelte';
	import Post from './post.svelte';
	import { usePostsQuery } from '$lib/posts/graphql/query.generated';
	import { GraphQLClient } from 'graphql-request';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import IconLogo from '../../assets/icon/icon-logo.svelte';

	$: page = 0;
	let gqlClient = new GraphQLClient('http://localhost:5173/graphql');
	$: postsQueryResult = usePostsQuery(gqlClient, { page });
	$: data = $postsQueryResult?.data?.posts || [];
	let newBatch = [];

	async function fetchData() {
		newBatch = $postsQueryResult?.data?.posts || [];
	}

	$: console.log('new', '🐸', data, '🔥', page);
	$: postList = [...newBatch, ...data];
</script>

<div class="wrapper">
	<div class="header-container">
		<IconLogo />
	</div>
	<div class="posts-container flex flex-wrap justify-center">
		{#if postList?.length}
			{#each postList as post}
				<Post {post} />
			{:else}
				<p>데이터가 없습니다.</p>
			{/each}
			<InfiniteScroll
				hasMore={true}
				threshold={100}
				on:loadMore={() => {
					page++;
					fetchData();
				}}
			/>
		{/if}
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
