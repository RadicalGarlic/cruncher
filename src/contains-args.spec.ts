import {describe, expect, test} from '@jest/globals';

import { ContainsArgs } from './contains-args.ts';

describe('contains-args', () => {
  test('happy path', () => {
    const args = new ContainsArgs([
      '--merge', 'mergeDir',
      '--outer', 'outDir',
      '--inner', 'inDir'
    ]);
    expect(args.getMergeDirPath()).toEqual('mergeDir');
    expect(args.getOuterDirPath()).toEqual('outDir');
    expect(args.getInnerDirPath()).toEqual('inDir');
  });
});
