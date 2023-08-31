import sharp from 'sharp';
import path from 'path';
import rimraf from 'rimraf';

import { getErrorMessage } from '~/utils';
import type { Item } from './items.server';

// curl -X POST -d 'imageUrl=https://media.s-bol.com/BLx97KQA2WmQ/550x733.jpg&itemId=abc123efg' http://localhost:3000/api/image

// Maybe set as env var?
const outputPath = path.join(__dirname, '../images');

const maxPixelDensity = 3;

type ResizeArgs = {
  input: Parameters<typeof sharp>[0];
  size: string;
  filename: string;
};

type ProcessArgs = {
  itemId: Item['id'];
  url: string;
};

function getImageSizes() {
  // Image sizes are defined as 'widthxheight'.
  // The 'x' is splitable which results in ['width', 'height'].
  // If one of those values should be calculated/inferred, use 'auto'.
  // Only add images for a pixel density of 1, the others will be calculated.
  return [
    '80x80', // Image size of item in small list

    '575xauto', // Max image size in list on mobile

    '600xauto', // Max image size on item page on mobile
    '900xauto', // Max image size on item page on tablet
    '1400xauto', // Max image size on item page on desktop
  ];
}

async function resizeImage({ input, size, filename }: ResizeArgs) {
  const [width, height] = size.split('x');

  const outputResults = [];

  for (let i = 1; i <= maxPixelDensity; i++) {
    const result = await sharp(input)
      .resize({
        width: width !== 'auto' ? parseInt(width, 10) * i : undefined,
        height: height !== 'auto' ? parseInt(height, 10) * i : undefined,
      })
      .toFormat('webp')
      .toFile(`${outputPath}/${filename}-${parseInt(width, 10) * i}w.webp`);

    outputResults.push(result);
  }

  return outputResults;
}

async function getImageFromURL(url: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Something went wrong fetching the image');

    const message = getErrorMessage(error);

    throw new Error(message);
  }
}

export async function processImage({ url, itemId }: ProcessArgs) {
  const sizes = getImageSizes();

  const image = await getImageFromURL(url);

  const resizedImages: string[] = [];
  for (const size of sizes) {
    const results = await resizeImage({
      input: image,
      size,
      filename: itemId,
    });

    results.forEach((result) => {
      resizedImages.push(`${itemId}-${size}.${result.format}`);
    });
  }

  return resizedImages;
}

export async function emptyGeneratedImagesFolder() {
  return rimraf(`${outputPath}/*`);
}

// (async () => {
//   const input = await getImageFromURL(
//     'https://media.s-bol.com/BLx97KQA2WmQ/550x733.jpg',
//   );
//
//   await resizeImage({
//     input,
//   });
// })();
