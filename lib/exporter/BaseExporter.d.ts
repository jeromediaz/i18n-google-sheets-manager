import { Output } from '../Configuration';
import { I18nKey, I18nMap } from '../SheetProcessor';
export default class BaseExporter {
    output: Output;
    constructor(output: Output);
    static keyPathExtractor(map: I18nKey, separator: String | false): any;
    process(map: I18nMap): Promise<void>;
    extractValues(_values: I18nKey): string;
    defaultFileName(_locale: string): string;
    processLocale(locale: string, values: I18nKey): Promise<void>;
}
