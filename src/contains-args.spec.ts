import {describe, expect, test} from '@jest/globals';

import { ContainsArgs } from './contains-args.ts';

describe('contains-args', () => {
  test('happy path', () => {
    const args = new ContainsArgs([
      '--merge', 'mergeDir',
      '--outer', 'outDir',
      '--inner', 'inDir'
    ]);
    expect(args.getMergeDirPath() === 'mergeDir');
    expect(args.getOuterDirPath() === 'outDir');
    expect(args.getInnerDirPath() === 'inDir');
  });
});
