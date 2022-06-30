import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Configuration } from './Configuration';
export default class DocumentLoader {
    doc: GoogleSpreadsheet;
    docLoading: Promise<void>;
    conf: Configuration;
    constructor(conf: Configuration);
    process(): Promise<void>;
}
