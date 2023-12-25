import { describe, expect, test } from '@jest/globals';
import { fail } from 'assert';

import { CrunchReport } from './crunch-report.ts';

describe('crunch-report', () => {
  test('refuse to crunch non-directory', async () => {
    const mockFsUtil = { isDirectory: () => Promise.resolve(false) };
    try {
      await CrunchReport.generate('adf', mockFsUtil);
    } catch (e) {
      expect(e.message.includes('Refusing to crunch non-directory')).toBeTruthy();
      return;
    }
    fail('Should have thrown');
  });
});
