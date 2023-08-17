<script lang="ts">
	// import supabase from '$lib/db';
	import type { PageData } from './$types';
	export let data: PageData;

	const handleFileChange = async (event: Event) => {
		const files = (event.target as HTMLInputElement).files;
		if (files && files[0]) {
			const formData = new FormData();
			formData.append('file', files[0]);

			const response = await fetch('/api/upload', {
				method: 'POST',
				headers: {
					// 'content-type': 'application/json',
					enctype: 'multipart/form-data'
				},
				body: formData
			});
		}
	};
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<div class="text-center">
	<input type="file" accept="image/*" on:change={handleFileChange} />
</div>
