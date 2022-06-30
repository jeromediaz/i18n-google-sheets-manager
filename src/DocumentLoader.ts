import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Configuration } from './Configuration';
import buildExporter from './exporter/Exporter';
import JSONExporter from './exporter/JSONExporter';
import SheetProcessor, { I18nMap } from './SheetProcessor';

export default class DocumentLoader {
  doc: GoogleSpreadsheet;

  docLoading: Promise<void>;
  conf: Configuration;

  constructor(conf: Configuration) {
    this.doc = new GoogleSpreadsheet(conf.docID);
    this.conf = conf;

    const { client_email, private_key } = conf.credentials;

    this.docLoading = this.doc
      .useServiceAccountAuth({ client_email, private_key })
      .then(() => {
        return this.doc.loadInfo();
      });
  }

  process(): Promise<void> {
    return this.docLoading.then(() => {
      const promises = this.conf.outputs.map((output) => {
        console.log(output);
        if (output.sheetIndex !== undefined) {
          const sheetProcessor = new SheetProcessor(
            this.doc.sheetsByIndex[output.sheetIndex]
          );

          sheetProcessor.process().then((i18nLocale) => {
            const exporter = buildExporter(output);
            return exporter.process(i18nLocale);
          });
        }
      });
    });
  }
}
