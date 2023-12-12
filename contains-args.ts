import { throwExpression } from './utils/utils';

export class ContainsArgs {
  constructor(args: string[]) {
    this.mergeDirPath = '';
    this.outerDirPath = '';
    this.innerDirPath = '';

    let i = 0;
    while (i < args.length) {
      if (args[i] === '--merge') {
        if (this.mergeDirPath) {
          throw new Error('--merge specified multiple times');
        }
        this.mergeDirPath = args[i + 1] ?? throwExpression('--merge arg not given');
        i += 2;
      } else if (args[i] === '--outer') {
        if (this.outerDirPath) {
          throw new Error('--outer specified multiple times');
        }
        this.outerDirPath = args[i + 1] ?? throwExpression('--outer arg not given');
        i += 2;
      } else if (args[i] === '--inner') {
        if (this.innerDirPath) {
          throw new Error('--inner specified multipe times');
        }
        this.innerDirPath = args[i + 1] ?? throwExpression('--inner arg not given');
        i += 2;
      } else {
        throw new Error('Unknown arg');
      }
    }

    if (!this.outerDirPath || !this.innerDirPath) {
      throw new Error('Not enough args specified');
    }
  }

  getOuterDirPath(): string { return this.outerDirPath; }
  getInnerDirPath(): string { return this.innerDirPath; }
  getMergeDirPath(): string { return this.mergeDirPath; }

  private outerDirPath: string;
  private innerDirPath: string;
  private mergeDirPath: string;
}
