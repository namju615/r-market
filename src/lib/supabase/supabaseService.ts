import { SupabaseClient, createClient } from '@supabase/supabase-js';

export class SupabaseService {
	private static instance?: SupabaseService;
	private supabase: SupabaseClient;

	private constructor() {
		console.log('SupabaseService create instance');
		this.supabase = createClient(`https://${import.meta.env.VITE_PROJECT}.supabase.co`, import.meta.env.VITE_ANON_KEY);
	}

	public static getInstance() {
		if (!SupabaseService.instance) {
			SupabaseService.instance = new SupabaseService();
		}
		return SupabaseService.instance;
	}

	public getClient() {
		return this.supabase;
	}
}

export const SupabaseInstanse = SupabaseService.getInstance;
