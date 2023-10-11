import { SupabaseInstanse } from '$lib/supabase/supabaseService';

// request id = 18 post data
const post = await SupabaseInstanse().getClient().rpc('get_post').eq('id', 1);

export default post;
