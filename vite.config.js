import { sveltekit } from '@sveltejs/kit/vite';
import injectSocketIO from './socketIo.config.js';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		{
			name: 'webSocketServer',
			configureServer(server) {
				injectSocketIO(server);
			},
		},
	],
};

export default config;
