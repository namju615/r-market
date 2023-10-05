<script lang="ts">
	import { onMount } from 'svelte';
	import { useMember } from '../../../hooks/memberHooks';
	import { member } from '../../../stores/member';

	const { login } = useMember();
	onMount(async () => await login());
	member.subscribe((data) => {
		if (data) window.location.href = '/';
	});
</script>

SUCCESS!!!
