import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { ANON_KEY, PROJECT } from '$env/static/private'; // load from env

export class SupabaseService {
	private static instance?: SupabaseService;
	private supabase: SupabaseClient;

	private constructor() {
		console.log('SupabaseService create instance');
		this.supabase = createClient(`https://${PROJECT}.supabase.co`, ANON_KEY);
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
