import { json } from '@sveltejs/kit';
import { AuthInstanse } from '$lib/auth/authService';

export async function POST({ request }: { request: Request }) {
	const user = await AuthInstanse().signUp(await request.json());
	if (user) return json({ message: 'OK', user }, { status: 200 });
	else return json({ message: 'error join' }, { status: 500 });
}
