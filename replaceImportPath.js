import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const files = glob.sync('src/lib/**/graphql/*.generated.ts', {
	nodir: true,
});

files.forEach((filePath) => {
	const fileContent = readFileSync(filePath, 'utf8');
	const updatedContent = fileContent
		.replace(/\.\.\/\.\.\/types/g, '$lib/types')
		.replace(/@tanstack\/react-query/g, '@sveltestack/svelte-query')
		.replace(/import type { RequestInit } from 'graphql-request\/dist\/types.dom';\n/g, '');

	writeFileSync(filePath, updatedContent, 'utf8');
	console.log(`File content updated: ${filePath}`);
});

console.log('File content updated for all generated files.');
