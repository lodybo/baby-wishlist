import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';

import { processImage } from '~/models/images.server';

export const loader = async ({}: LoaderArgs) => {
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const { imageUrl, itemId } = Object.fromEntries(await request.formData());
  invariant(imageUrl, 'Missing image URL');
  invariant(itemId, 'Missing image URL');
  invariant(typeof imageUrl === 'string', 'Image URL is of incorrect type');
  invariant(typeof itemId === 'string', 'Image URL is of incorrect type');

  const images = await processImage({
    url: imageUrl,
    itemId,
  });

  return new Response(JSON.stringify(images), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
