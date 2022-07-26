import fs from 'fs';

export interface Credentials {
  client_email: string;
  private_key: string;
}

export interface Output {
  sheetIndex: number;
  method: 'json';
  outputDir: string;
  fileName?: string;
  keyPathSeparator?: string | false;
}

export interface Configuration {
  credentials: Credentials | string;
  docID: string;
  outputs: Output[];
}

export function loadConfiguration(path: string): Configuration | undefined {
  const jsonContent = fs.readFileSync(path, { encoding: 'utf-8' });

  const configuration = JSON.parse(jsonContent) as Configuration;

  if (configuration) {
    return configuration;
  }

  return undefined;
}
