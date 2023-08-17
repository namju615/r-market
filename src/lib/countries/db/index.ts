import supabase from '$lib/db';

// request all the countries
const countries = await supabase.from('countries').select(); //.range(0, 9);

export default countries;
