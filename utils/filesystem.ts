import * as fsPromises from 'node:fs/promises';

export async function isDirectory(path: string): Promise<boolean> {
  return (await fsPromises.stat(path)).isDirectory();
}
