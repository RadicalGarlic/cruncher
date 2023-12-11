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

    const cruncher = new CrunchReport(outerDirPath);
    cruncher.generate();
  } else {
    console.log(getUsageMsg());
  }
}

main();
