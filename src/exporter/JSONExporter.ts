import { I18nKey } from '../SheetProcessor';
import BaseExporter from './BaseExporter';

export default class JSONExporter extends BaseExporter {
  extractValues(values: I18nKey): string {
    const extractedValues = BaseExporter.keyPathExtractor(
      values,
      this.output.keyPathSeparator || '.'
    );
    return JSON.stringify(extractedValues, null, 2);
  }

  defaultFileName(locale: string): string {
    return `${locale}.json`;
  }
}
