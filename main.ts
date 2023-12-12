import * as os from 'node:os';
import * as path from 'node:path';

import { CrunchReport } from './crunch-report';
import { throwExpression } from './utils/utils';
import { ContainsArgs } from './contains-args';

function getUsageMsg(): string {
  return `Usage:${os.EOL}`
    + `  cruncher contains [--merge dumpDir] --outer dirPath --inner otherDirPath`;
}

async function main() {
  console.log(process.argv[33]);
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
      // create some dir
      // copy all files
    }

    console.log(JSON.stringify(missing, null, 2));
  } else {
    console.log(getUsageMsg());
  }
}

main();
