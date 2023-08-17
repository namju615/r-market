<script>
	import { page } from '$app/stores';
</script>

<div class="column align-center">
	<h1 class="font-bold">ERROR !!</h1>
	<p class="text-lg font-medium">{$page.status}: {$page.error && $page.error.message}</p>
</div>
