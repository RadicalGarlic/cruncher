import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

export class CrunchReport {
  constructor(private dirPath: string) {
    this.report = {};
  }

  async generate() {
    if (!this.isDirectory()) {
      throw new Error(`Refusing to crunch non-directory '${this.dirPath}'`)
    }

    const entries: fs.Dirent[] = await fsPromises.readdir(process.argv[2], {
      withFileTypes: true,
      recursive: true,
    });

    entries.forEach((entry: fs.Dirent) => {
      if (entry.isFile()) {
        console.log(path.resolve(entry.path, entry.name));
      }
    });

    this.report['asdf'] = ['asdf', 'asdf'];
  }

  private async isDirectory(): Promise<boolean> {
    return (await fsPromises.stat(this.dirPath)).isDirectory();
  }

  private report: { [key: string]: string[] };
}
