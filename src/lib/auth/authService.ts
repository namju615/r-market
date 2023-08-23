import { ANON_KEY, PROJECT } from '$env/static/private'; // load from env
import { SupabaseInstanse } from '$lib/supabase/supabaseService';
import type { SupabaseClient } from '@supabase/supabase-js';

export class AuthService {
	private static instance?: AuthService;
	private supabase: SupabaseClient;

	private constructor() {
		console.log('AuthService create instance');
		this.supabase = SupabaseInstanse().getClient();
	}

	public static getInstance() {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}
		return AuthService.instance;
	}

	// 사용자 로그인 (sign in) 메서드
	async signUp() {
		return await this.supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
				redirectTo: 'http://localhost:5173/auth/redirect',
			},
		});
	}

	// 사용자 로그아웃 (sign out) 메서드
	async signOut() {
		return this.supabase.auth.signOut();
	}

	// 현재 로그인된 사용자의 프로필 정보를 가져오는 메서드
	async getProfile() {
		const { data, error } = await this.supabase.auth.getUser();

		return data.user?.id;
	}

	// 현재 세션에 로그인된 사용자 ID를 반환하는 메서드
	async getSession() {
		const session = await this.supabase.auth.getSession();

		if (session) {
			return session.data.session?.user.id;
		} else {
			return null;
		}
	}
}

export const AuthInstanse = AuthService.getInstance;
