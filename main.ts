import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

import { CrunchReport } from './crunch-report';

async function main() {
  if (process.argv.length < 3) {
    console.log('Specify directory path');
  }

  const cruncher = new CrunchReport(process.argv[2]);
  cruncher.generate();
}

main();
