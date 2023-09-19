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

	// 구글 oauth 로그인 메서드
	async signInOAuth() {
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

	async signUp(user: { uuid: string; email?: string; name?: string; profile_image_url?: string }) {
		const { data, error } = await this.supabase.from('member').select().eq('uuid', user.uuid).single();

		// The result contains 0 rows
		if (!error || error.code === 'PGRST116') {
			if (!data) {
				const response = await this.supabase.from('member').insert(user).select().single();
				return response.data;
			} else {
				return data;
			}
		}
	}

	// 사용자 로그아웃 (sign out) 메서드
	async signOut() {
		return this.supabase.auth.signOut();
	}

	// 현재 로그인된 사용자의 프로필 정보를 가져오는 메서드
	async getProfile() {
		const { data, error } = await this.supabase.auth.getUser();
		return data.user;
	}

	// 현재 세션에 로그인된 사용자 ID를 반환하는 메서드
	async getSession() {
		const { data, error } = await this.supabase.auth.getSession();
		return data;
	}

	async setSession(session: { access_token: string; refresh_token: string }) {
		if (session) {
			const { data, error } = await this.supabase.auth.setSession(session);
			return data;
		}
		return null;
	}
}

export const AuthInstanse = AuthService.getInstance;
