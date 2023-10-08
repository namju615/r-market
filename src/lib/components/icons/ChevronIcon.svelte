<script lang="ts">
	export let direction: string = 'left';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	transform={`rotate(${direction === 'left' ? '0' : '180'})`}
>
	<g filter="url(#filter0_d_443_7273)">
		<path
			d="M15 20L7.70711 12.7071C7.31658 12.3166 7.31658 11.6834 7.70711 11.2929L15 4"
			stroke="#3147B1"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
	</g>
	<defs>
		<filter
			id="filter0_d_443_7273"
			x="5.66406"
			y="2.25"
			width="11.0859"
			height="19.5"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset />
			<feGaussianBlur stdDeviation="0.5" />
			<feComposite in2="hardAlpha" operator="out" />
			<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
			<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_443_7273" />
			<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_443_7273" result="shape" />
		</filter>
	</defs>
</svg>
