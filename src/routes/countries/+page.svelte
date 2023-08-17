<script lang="ts">
	import { GraphQLClient } from 'graphql-request';
	import { useCountriesQuery } from '$lib/countries/graphql/query.generated';
	import type { PageData } from './$types';

	export let data: PageData;

	const gqlClient = new GraphQLClient('http://localhost:5173/graphql');

	const countriesQueryResult = useCountriesQuery(gqlClient);
	const { countries } = $countriesQueryResult.data!;
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<div class="text-center">
	<h1 class="text-3xl font-bold">Hello Countries!</h1>
	<a href="/"> > Back Home</a>
	<div class="mt-5 h-64 overflow-y-scroll">
		{#each countries as country, index}
			<span class="flex justify-center">
				<p class="font-bold">{country?.iso2}&nbsp;</p>
				<p>({country?.name})</p>
			</span>
		{/each}
	</div>
</div>
