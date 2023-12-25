import * as os from 'node:os';
import * as path from 'node:path';
import * as fsPromises from 'node:fs/promises';

import { CrunchReport } from './crunch-report';
import { throwExpression } from './utils/utils';
import { ContainsArgs } from './contains-args';

function getUsageMsg(): string {
  return `Usage:${os.EOL}`
    + `  cruncher contains [--merge dumpDir] --outer dirPath --inner otherDirPath`;
}

async function main() {
  if (process.argv.length < 3) {
    console.log(getUsageMsg());
    return;
  }

  if (process.argv[2] === 'contains') {
    const args = new ContainsArgs(process.argv.slice(3));

    const outerCrunch = await CrunchReport.generate(args.getOuterDirPath());
    const innerCrunch = await CrunchReport.generate(args.getInnerDirPath());

    const missing: Record<string, string[]> = {};
    for (const key in innerCrunch) {
      if (!outerCrunch[key] || (outerCrunch[key].length === 0)) {
        missing[key] = innerCrunch[key];
      }
    }

    if (args.getMergeDirPath()) {
      for (const key in missing) {
        for (const keyPath of missing[key]) {
          const dstCopyPath = path.join(args.getMergeDirPath(), keyPath);
          await fsPromises.mkdir(
            path.dirname(dstCopyPath),
            { recursive: true }
          );
          await fsPromises.copyFile(keyPath, dstCopyPath);
        }
      }
    }

    console.log(JSON.stringify(missing, null, 2));
  } else {
    console.log(getUsageMsg());
  }
}

main();
