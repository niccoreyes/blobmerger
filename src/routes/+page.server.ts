import { error } from '@sveltejs/kit'
import { put } from '@vercel/blob'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'
import { PDFMerger } from 'pdf-merger-js';

export const actions = {
  upload: async ({ request }) => {
    const form = await request.formData();
    const file_1 = form.get('image-upload_1') as File;
    const file_2 = form.get('image-upload_2') as File;

    if (!(file_1 && file_2)) {
      error(400, { message: 'No files to merge' });
    }
    var merger = new PDFMerger();
    await merger.add(file_1);
    await merger.add(file_2);
    await merger.save('merged.pdf')
    // const { url } = await put(file.name, file, {
    //   access: 'public',
    //   token: BLOB_READ_WRITE_TOKEN,
    // });

    // const { url } = {
    //   access: 'public'
    // }
    return { uploaded: url }
  },
}
