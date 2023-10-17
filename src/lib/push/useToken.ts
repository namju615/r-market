import type { IToken } from '$lib/types';
import { get, writable } from 'svelte/store';

const useToken = () => {
	const isLoggedIn = true; // TODO: 유저의 로그인 상태 확인
	const tokenState = writable<string | null>(null);
	let tokenRef: string | null = null;

	const syncToken = async (token: string) => {
		let tokenResult: { result: string; data: IToken | null } = { result: 'creation-failed', data: null };

		// TODO: tokenRef 를 하나로 관리할 수 없는 상태이므로 아래 예외는 어떻게 처리할지?
		// if (tokenRef) throw new Error('you can only have one token');

		if (!isLoggedIn) return tokenResult;

		const previousToken = get(tokenState);
		const currentToken = token;
		tokenRef = token;

		tokenState.set(tokenRef);
		console.log(previousToken, currentToken);

		if (!previousToken && !currentToken) {
			console.log('previousToken and currentToken are empty');
			return tokenResult;
		}
		if (previousToken === currentToken) {
			console.log('not modified');
			tokenResult = { result: 'not-modified', data: null };
			return tokenResult;
		}

		if (previousToken && previousToken !== currentToken) {
			const response = await fetch(`/api/token?value=${previousToken}`);
			const { data: subscriptions } = await response.json();

			const subscription = subscriptions[0];

			if (subscription) {
				const result = await fetch('/api/token/delete', {
					method: 'DELETE',
					body: JSON.stringify({ user_id: 1, token_id: subscription.token_id }),
					headers: {
						'content-type': 'application/json',
					},
				});

				console.log('previous token deleted in server ', result);
			}
		}

		if (currentToken) {
			const response = await fetch(`/api/token?value=${currentToken}`);
			const { data: subscriptions } = await response.json();

			const subscription = subscriptions[0];

			if (!subscription) {
				const response = await fetch('/api/token/create', {
					method: 'POST',
					body: JSON.stringify({ token_value: currentToken, user_id: 1 }),
					headers: {
						'content-type': 'application/json',
					},
				});

				const { data } = await response.json();
				tokenResult = { result: 'created', data: data ? data[0] : null };

				console.log('token created in server ', data);
			}
		}

		return tokenResult;
	};

	const deleteToken = async () => {
		const tokenValue = tokenRef || get(tokenState);
		if (!tokenValue) return;

		const item = localStorage.getItem('token');

		let previousToken;
		if (item) {
			try {
				previousToken = JSON.parse(item).token;
			} catch (error) {
				console.log(error);
			}
		}

		if (previousToken) {
			localStorage.removeItem('token');
			console.log('token deleted');
		}

		const response = await fetch('/api/token');
		const { data: subscriptions } = await response.json();

		const subscription = subscriptions.find((subscription: IToken) => subscription.token_value === tokenValue);

		if (subscription) {
			await fetch('/api/subscription/delete', {
				method: 'DELETE',
				body: JSON.stringify({ user_id: 1, token_id: subscription.token_id }),
				headers: {
					'content-type': 'application/json',
				},
			});
		}
	};

	return {
		syncToken,
		deleteToken,
	};
};

export default useToken;
