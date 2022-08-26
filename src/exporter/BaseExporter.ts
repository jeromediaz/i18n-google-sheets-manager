import { Output } from '../Configuration';
import { I18nKey, I18nMap } from '../SheetProcessor';
import fsPromises from 'fs/promises';
import path from 'path';
import Mustache from 'mustache';

export default class BaseExporter {
  output: Output;

  constructor(output: Output) {
    this.output = output;
  }

  static keyPathExtractor(map: I18nKey, separator: String | false): any {
    if (separator === false) {
      return map;
    }

    const extractedMap = {} as any;

    Object.keys(map).forEach((key) => {
      const splittedKeys = key.split(separator as string);

      const finalPath = splittedKeys.pop();
      if (!finalPath) {
        return;
      }

      const wrapperObject = splittedKeys.reduce((acc, subKey) => {
        let subObject = acc[subKey];
        if (!subObject) {
          subObject = {};
          acc[subKey] = subObject;
        }
        return subObject;
      }, extractedMap);

      wrapperObject[finalPath] = map[key];
    });

    return extractedMap;
  }

  process(map: I18nMap): Promise<void> {
    return fsPromises
      .mkdir(path.resolve(this.output.outputDir), { recursive: true })
      .then(() => {
        const promises = Object.keys(map).map((locale) => {
          return this.processLocale(locale, map[locale]);
        });

        return Promise.all(promises).then(() => {
          // nothing to do
        });
      });
  }

  extractValues(_values: I18nKey): string {
    throw new Error('unimplemented method extractValues');
  }

  defaultFileName(_locale: string): string {
    throw new Error('unimplemented method extractValues');
  }

  processLocale(locale: string, values: I18nKey): Promise<void> {
    const fileName = this.output.fileName
      ? Mustache.render(this.output.fileName, { locale })
      : this.defaultFileName(locale);

    const outputPath = path.resolve(this.output.outputDir, fileName);

    return fsPromises
      .mkdir(path.dirname(outputPath), { recursive: true })
      .then(() => {
        return fsPromises.writeFile(outputPath, this.extractValues(values));
      });
  }
}
