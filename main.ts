import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

async function main() {
  if (process.argv.length < 3) {
    console.log('Specify directory path');
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
}

main();
