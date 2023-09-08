import { SupabaseInstanse } from '$lib/supabase/supabaseService';

const posts = await SupabaseInstanse().getClient().from('posts').select();

export default posts;
