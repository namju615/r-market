import { SupabaseInstanse } from '$lib/supabase/supabaseService';

// request all the countries
const countries = await SupabaseInstanse().getClient().from('countries').select(); //.range(0, 9);

export default countries;
