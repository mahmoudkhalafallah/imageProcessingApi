import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fullSizeImageDirPath, resizedImageDirPath } from '..';
import { getResizedImageFilePath } from '../file';
/**
 * @param  {string} fullSizeImageFilePath
 * @param  {number} width
 * @param  {number} height
 */
export const resizeImage = async (
  fullSizeImageFilePath: string,
  width: number,
  height: number
): Promise<sharp.Sharp> =>
  await sharp(fullSizeImageFilePath).resize(width, height);

interface generateThumbProps {
  filename: string;
  thumbFilename: string;
  width: number;
  height: number;
}
/**
 * @param  {generateThumbProps} props
 */
export const generateThumb: (
  props: generateThumbProps
) => Promise<void> = async ({ filename, thumbFilename, width, height }) => {
  const fullSizeImageFilePath = path.join(fullSizeImageDirPath, filename);
  const resized = await resizeImage(fullSizeImageFilePath, width, height);

  // create thumb folder if it doesn't exist
  fs.mkdir(
    resizedImageDirPath,
    {
      recursive: true,
    },
    (err) => {
      if (err) {
        throw 'Error creating the thumb folder.';
      }
    }
  );

  // save resized image
  await resized.toFile(getResizedImageFilePath(thumbFilename));
};
