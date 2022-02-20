import express from 'express';
import { promises as fsPromises } from 'fs';
import {
  validateDimension,
  generateThumb,
  fullSizeImageDirPath,
  getResizedImageFilePath,
  getThumbFilename,
  getFileExt,
  getFileNameExcludingExt,
} from '../../../utilities';

const router = express.Router();

router.get('/', async (req, res) => {
  const {
    filename: requestedFilename,
    width: requestedWidth,
    height: requestedHeight,
  } = req.query;

  if (!requestedFilename) {
    res.status(400);
    return res.end('Please enter a filename!');
  }

  let filename;
  try {
    // get full file name if file is available
    const dir = await fsPromises.readdir(fullSizeImageDirPath);
    const filenameRegex = new RegExp(requestedFilename.toString() + '?.*');

    filename = dir.find((file) => {
      return filenameRegex.test(file);
    });
  } catch (err) {
    res.status(500);
    return res.send(
      'Something went wrong! assets/images directory is missing!'
    );
  }

  if (!filename) {
    res.status(404);
    return res.end('File not found! Please try a different filename');
  }

  let width: number;
  try {
    width = validateDimension(requestedWidth);
  } catch (error) {
    res.status(400);
    return res.send('Please provide a valid width numerical value');
  }

  let height: number;
  try {
    height = validateDimension(requestedHeight);
  } catch (error) {
    res.status(400);
    return res.send('Please provide a valid height numerical value');
  }

  const fileExtension = getFileExt(filename);
  const thumbFilename = getThumbFilename(
    getFileNameExcludingExt(filename),
    width,
    height,
    fileExtension
  );

  // try cache first
  try {
    const thumbImg = await fsPromises.readFile(
      getResizedImageFilePath(thumbFilename)
    );
    if (thumbImg) {
      res.contentType(`image/${fileExtension}`);
      return res.send(Buffer.from(thumbImg.buffer));
    }
  } catch (error) {
    console.log('No cached image! Generating.. ', error);
  }

  // generate thumb
  try {
    await generateThumb({
      filename,
      thumbFilename,
      width,
      height,
    });
  } catch (error) {
    console.warn(error);
    res.status(500);
    return res.send('Something went wrong! Please try again later!');
  }

  // return thumb
  const thumbImg = await fsPromises.readFile(
    getResizedImageFilePath(thumbFilename)
  );
  res.contentType(`image/${fileExtension}`);
  return res.send(Buffer.from(thumbImg.buffer));
});

export default router;
