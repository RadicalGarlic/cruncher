import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

import { hashFile } from './utils/hasher';
import { isDirectory } from './utils/filesystem';

export class CrunchReport {
  private contructor() { }

  static async generate(dirPath: string): Promise<Record<string, string[]>> {
    if (!isDirectory(dirPath)) {
      throw new Error(`Refusing to crunch non-directory '${dirPath}'`)
    }

    const report: Record<string, string[]> = {};
    const entries: fs.Dirent[] = await fsPromises.readdir(dirPath, {
      withFileTypes: true,
      recursive: true,
    });

    for (const entry of entries) {
      if (entry.isFile()) {
        const absPath = path.resolve(entry.path, entry.name);
        const hash = await hashFile(absPath);
        if (!report[hash]) {
          report[hash] = [];
        }
        report[hash].push(absPath);
      }
    }

    return report;
  }
}
