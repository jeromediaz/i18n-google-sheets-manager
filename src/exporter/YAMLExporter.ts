import { I18nKey } from '../SheetProcessor';
import BaseExporter from './BaseExporter';

import yaml from 'js-yaml';

export default class YAMLExporter extends BaseExporter {
  extractValues(values: I18nKey): string {
    const extractedValues = BaseExporter.keyPathExtractor(
      values,
      this.output.keyPathSeparator || '.'
    );
    return yaml.dump(extractedValues);
  }

  defaultFileName(locale: string): string {
    return `${locale}.yml`;
  }
}
