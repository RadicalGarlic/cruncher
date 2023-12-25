import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';

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

  return new Promise<string>((resolve, reject) => {
    fsPromises.open(path).then((handle: fsPromises.FileHandle) => {
      const hasher: crypto.Hash = crypto.createHash(alg);
      const readStream: fs.ReadStream = handle.createReadStream(
        { autoClose: true }
      );
      readStream.on('data', (chunk: string | Buffer) => hasher.update(chunk));
      readStream.on('end', () => resolve(hasher.digest(outputFormat)));
      readStream.on('error', (err: Error) => reject(err));
    }).catch(reason => reject(reason));
  });
}
