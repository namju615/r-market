import { fetcher } from '../query/fetcher';

export const requestLogin = async (data: any) => {
	return await fetcher({
		url: '/api/session',
		method: 'POST',
		body: data,
	});
};
