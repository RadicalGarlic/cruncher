import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';

import { fullRead } from './file-full-read';

export type Algorithm = 'sha1';

export type OutputFormat = 'hex';

export function hash(
  buf: Buffer,
  alg: Algorithm = 'sha1',
  outputFormat: OutputFormat = 'hex'
): string {
  const hash: crypto.Hash = crypto.createHash(alg);
  hash.update(buf);
  return hash.digest(outputFormat);
}

export async function hashFile(
  path: string,
  alg: Algorithm = 'sha1',
  outputFormat: OutputFormat = 'hex'
): Promise<string> {
  const stats: fs.Stats = await fsPromises.stat(path);
  if (!stats.isFile()) {
    throw new Error(`Cannot hash non-file '${path}`);
  }

  const handle: fsPromises.FileHandle = await fsPromises.open(path);
  try {
    const fileLen = stats.size;
    const BUF_LEN = 4096;
    const hasher: crypto.Hash = crypto.createHash(alg);
    let readBytes = 0;
    while (readBytes < fileLen) {
      const buf: Buffer = await fullRead(
        handle,
        readBytes,
        Math.min(BUF_LEN, fileLen - readBytes)
      );
      hasher.update(buf);
      readBytes += buf.byteLength;
    }

    if (readBytes !== fileLen) {
      throw new Error(`Byte length mismatch in hashFile(${path}), ${readBytes}, ${fileLen}`);
    }

    return hasher.digest(outputFormat);
  } finally {
    await handle.close();
  }
}
