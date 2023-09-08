import sharp from 'sharp';
import path from 'path';

import { getErrorMessage } from '~/utils';
import type { Item } from './items.server';

// curl -X POST -d 'imageUrl=https://media.s-bol.com/BLx97KQA2WmQ/550x733.jpg&itemId=abc123efg' http://localhost:3000/api/image

// Maybe set as env var?
const outputPath = path.join(__dirname, '../images');

const maxPixelDensity = 3;
const maxImageWidth = 2000;

type ResizeArgs = {
  input: Parameters<typeof sharp>[0];
  size: string;
  filename: string;
};

type ProcessArgs = {
  itemId: Item['id'];
  url: string;
};

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

async function saveImage({ input, filename }: Omit<ResizeArgs, 'size'>) {
  for (let i = 1; i <= maxPixelDensity; i++) {
    await sharp(input)
      .resize({
        width: maxImageWidth,
      })
      .toFormat('webp')
      .toFile(`${outputPath}/${filename}.webp`);
  }
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
  const image = await getImageFromURL(url);

  return saveImage({
    input: image,
    filename: itemId,
  });
}
