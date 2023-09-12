<script lang="ts">
	import type { Action } from 'svelte/action';
	import IconStar from '../../assets/icon/icon-star.svelte';
	import type { IPost } from '$lib/types';

	export let post: IPost | null;
	let isFavorite = false;
	// type Favorite = boolean;

	// const handleFavorite: Action<HTMLButtonElement, Favorite, { 'on:click': (e: CustomEvent<boolean>) => void }> = (
	// 	node,
	// 	params,
	// ) => {
	// 	console.log(node, params);
	// };
</script>

<div class="post-container">
	<div class="image-container">
		{#if post?.image_url}
			<img src={post?.image_url} alt="" />
		{:else}
			<div class="image-empty" />
		{/if}
		<button
			class="favorite"
			on:click={() => {
				isFavorite = !isFavorite;
			}}
		>
			<IconStar {isFavorite} />
		</button>
		<div class="status">{post?.status === 'open' ? '판매중' : '판매완료'}</div>
	</div>
	<div class="content-container">
		<div>
			<div class="category">#{post?.hashtag}</div>
			<div class="title">{post?.title}</div>
		</div>
		<section>
			<div>
				<div class="amount">{post?.price}</div>
				<div class="date">{post?.create_date}</div>
			</div>
			<div class="name">{'name'}</div>
		</section>
	</div>
</div>

<style lang="scss">
	.post-container {
		min-width: 300px;
		max-width: 1200px;
	}
	.image-container {
		position: relative;

		img,
		.image-empty {
			width: 300px;
			height: 300px;
			object-fit: contain;
		}
		.favorite {
			width: 20px;
			height: 20px;
			position: absolute;
			bottom: 20px;
			right: 20px;
		}
		.status {
			position: absolute;
			width: 50px;
			height: 20px;
			background-color: red;
			color: #fff;
			top: 0px;
			left: 40px;
			text-align: center;
			font-size: 12px;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
		}
	}
	.content-container {
		padding: 0 10px;
	}
	.category {
		color: #8290d1;
		font-size: 12px;
	}
	.title {
		font-size: 14px;
	}
	section {
		display: flex;
		justify-content: space-between;
		.amount {
			font-size: 18px;
			font-weight: bold;
		}
		.date,
		.name {
			font-size: 12px;
			color: #ccc;
			text-align: bottom;
		}

		.name {
			display: flex;
			align-items: flex-end;
			padding-right: 30px;
		}
	}
</style>
