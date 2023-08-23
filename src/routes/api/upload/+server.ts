import { json } from '@sveltejs/kit';
import supabase from '$lib/db';

export async function POST({ request }: { request: Request }) {
	const now = new Date();
	const timestamp = now.getTime();
	const formData = await request.formData();
	const file = formData.get('file') as File;
	const { data, error } = await supabase.storage
		.from('UPLOAD')
		.upload(`./${timestamp + '.' + file.name.split('.').pop()}`, file);

	if (data) {
		const {
			data: { publicUrl }
		} = await supabase.storage.from('UPLOAD').getPublicUrl(data.path);
		return json({ message: 'OK', filePath: publicUrl }, { status: 200 });
	} else {
		return json({ message: 'Fail', error }, { status: 500 });
	}
}
