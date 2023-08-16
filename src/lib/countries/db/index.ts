import supabase from '$lib/db';

// request all the countries
const countries = await supabase.from('countries').select();

export default countries;
