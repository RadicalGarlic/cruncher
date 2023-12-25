import * as fsPromises from 'node:fs/promises';

export class FileSystem {
  async isDirectory(path: string): Promise<boolean> {
    return (await fsPromises.stat(path)).isDirectory();
  }
}
