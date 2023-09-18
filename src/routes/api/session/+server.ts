import { json } from '@sveltejs/kit';
import { AuthInstanse } from '$lib/auth/authService';

export async function POST({ request }: { request: Request }) {
	const session = await AuthInstanse().setSession(await request.json());

	// TODO getSession이 null

	if (session?.user) {
		const user = session.user;
		AuthInstanse().signUp({
			uuid: user.id,
			email: user.email,
			profile_image_url: user.user_metadata.avatar_url,
			name: user.user_metadata.name,
		});

		return json({ message: 'OK', user: user }, { status: 200 });
	}
	return json({ message: 'not found user' }, { status: 500 });
}
