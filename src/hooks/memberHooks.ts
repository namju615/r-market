import { tick } from 'svelte';
import { AuthInstanse } from '$lib/auth/authService';
import { member } from '../stores/member';
import { requestLogin } from '../api/member';

export const useMember = () => {
	let error = false;

	const login = async () => {
		const { session } = await AuthInstanse().getSession();
		if (session) {
			try {
				const response = await requestLogin({
					uuid: session.user.id,
					email: session.user.email,
					profile_image_url: session.user.user_metadata.avatar_url,
					name: session.user.user_metadata.name,
				});

				sessionStorage.setItem('T1', session.access_token);
				sessionStorage.setItem('T2', session.refresh_token);

				member.login(response.user);
				$: tick().then(() => (error = false));
			} catch (e) {
				$: tick().then(() => (error = true));
				console.log(e);
			}
		}
	};
	const refresh = async () => {
		const refreshData = await AuthInstanse().refreshSession(sessionStorage.getItem('T2') || '');

		if (refreshData?.session) {
			sessionStorage.setItem('T1', refreshData?.session.access_token);
			sessionStorage.setItem('T2', refreshData?.session.refresh_token);
		} else {
			logout();
		}
	};
	const logout = () => {
		member.logout();
		sessionStorage.removeItem('T1');
		sessionStorage.removeItem('T2');
		AuthInstanse().signOut();
	};

	return { error, login, logout, refresh };
};
