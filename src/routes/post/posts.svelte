<script lang="ts">
	import Post from './post.svelte';
	import { usePostsQuery } from '$lib/posts/graphql/query.generated';
	import { GraphQLClient } from 'graphql-request';

	const gqlClient = new GraphQLClient('http://localhost:5173/graphql');
	const postsQueryResult = usePostsQuery(gqlClient);
	const { posts } = $postsQueryResult.data!;

	console.log(posts);
</script>

<div class="flex flex-wrap justify-center">
	{#each posts as post}
		<Post {post} />
	{/each}
</div>
