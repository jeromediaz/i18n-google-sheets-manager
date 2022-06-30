import { Output } from './Configuration';
import { I18nKey, I18nMap } from './SheetProcessor';
export default class JSONExporter {
    output: Output;
    constructor(output: Output);
    process(map: I18nMap): Promise<void>;
    processLocale(locale: String, values: I18nKey): Promise<void>;
}
