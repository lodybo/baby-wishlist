import {
  emptyGeneratedImagesFolder,
  processImage,
} from '~/models/images.server';
import { getItemList } from '~/models/items.server';
import { getErrorMessage } from '~/utils';

export const action = async () => {
  const items = await getItemList();

  try {
    await emptyGeneratedImagesFolder();

    for (const item of items) {
      const { imageUrl, id } = item;

      if (imageUrl) {
        await processImage({
          url: imageUrl,
          itemId: id,
        });
      }
    }
  } catch (e) {
    const message = getErrorMessage(e);
    return new Response(JSON.stringify({ success: false, message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
};
