<script>
	import { onMount } from 'svelte';
	import { GraphQLClient } from 'graphql-request';
	import { usePostQuery } from '$lib/post/graphql/query.generated';
	export let data;

	const gqlClient = new GraphQLClient('http://localhost:5173/graphql');
	$: postsQueryResult = usePostQuery(gqlClient, { id: Number(data?.slug) });

	$: console.log($postsQueryResult?.data);
	onMount(async () => {});
</script>

<h1>{data.slug}</h1>
