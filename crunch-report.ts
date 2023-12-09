import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

import { hashFile } from './utils/hasher';

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

    for (const entry of entries) {
      if (entry.isFile()) {
        const absPath = path.resolve(entry.path, entry.name);
        const hash = await hashFile(absPath);

        if (!this.report[hash]) {
          this.report[hash] = [];
        }
        this.report[hash].push(absPath);
      }
    }

    console.log(this.report);
  }

  private async isDirectory(): Promise<boolean> {
    return (await fsPromises.stat(this.dirPath)).isDirectory();
  }

  private report: { [key: string]: string[] };
}
