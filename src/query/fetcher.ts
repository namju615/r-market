interface IOptions {
	url: string;
	method?: string;
	body: any;
	headers?: any;
}

export const fetcher = async (options: IOptions) => {
	const { url, method = 'POST', body, headers } = options;
	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: JSON.stringify(body),
	});
	if (response.status === 200) {
		return await response.json();
	}
	throw new Error('fetcher - http status :' + response.status);
};
