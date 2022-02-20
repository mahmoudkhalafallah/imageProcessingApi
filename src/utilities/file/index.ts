import path from 'path';
import { ParsedQs } from 'qs';
import { defaultDimentionValue, resizedImageDirPath } from '../constants';

type QueryValue = ParsedQs | ParsedQs[] | string[] | string | undefined;

/**
 * @param  {QueryValue} dimension
 * @returns defaultDimentionValue
 */
export function validateDimension(dimension: QueryValue) {
  const parsed = parseInt(dimension as string);
  return !Number.isNaN(parsed) ? parsed : defaultDimentionValue;
}

/**
 * @param  {string} filename
 */
export function getResizedImageFilePath(filename: string): string {
  return path.join(resizedImageDirPath, filename);
}

/**
 * @param  {string} filename
 */
export function getFileExt(filename: string): string {
  return filename?.split('.')[1];
}

/**
 * @param  {string} filename
 */
export function getFileNameExcludingExt(filename: string): string {
  return filename?.split('.')[0];
}

/**
 * @param  {string} filename
 * @param  {number} width
 * @param  {number} height
 * @param  {string} fileExtension
 * @returns string
 */
export function getThumbFilename(
  filename: string,
  width: number,
  height: number,
  fileExtension: string
): string {
  return `${filename}_${width}x${height}.${fileExtension}`;
}
