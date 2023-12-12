import * as os from 'node:os';

import { CrunchReport } from './crunch-report';

function getUsageMsg(): string {
  return `Usage:${os.EOL}`
    + `  cruncher contains --outer dirPath otherDirPath`;
}

async function main() {
  if (process.argv.length < 3) {
    console.log(getUsageMsg());
    return;
  }

  if (process.argv[2] === 'contains') {
    if ((process.argv.length < 6) || (process.argv[3] !== '--outer')) {
      console.log(getUsageMsg());
      return;
    }

    const outerDirPath: string = process.argv[4];
    const innerDirPath: string = process.argv[5];

    const outerCrunch = await CrunchReport.generate(outerDirPath);
    const innerCrunch = await CrunchReport.generate(innerDirPath);

    const missing: Record<string, string[]> = {};
    for (const key in innerCrunch) {
      if (!outerCrunch[key] || (outerCrunch[key].length === 0)) {
        missing[key] = innerCrunch[key];
      }
    }

    console.log(JSON.stringify(missing, null, 2));
  } else {
    console.log(getUsageMsg());
  }
}

main();
