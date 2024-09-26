import { I18nKey } from '../SheetProcessor';
import BaseExporter from './BaseExporter';
export default class JSONExporter extends BaseExporter {
    extractValues(values: I18nKey): string;
    defaultFileName(locale: string): string;
}
