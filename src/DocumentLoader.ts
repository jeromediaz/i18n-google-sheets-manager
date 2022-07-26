import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Configuration, Credentials } from './Configuration';
import buildExporter from './exporter/Exporter';
import JSONExporter from './exporter/JSONExporter';
import SheetProcessor, { I18nMap } from './SheetProcessor';
import fs from 'fs';
import path from 'path';

export default class DocumentLoader {
  doc: GoogleSpreadsheet;

  docLoading: Promise<void>;
  conf: Configuration;

  constructor(conf: Configuration) {
    this.doc = new GoogleSpreadsheet(conf.docID);
    this.conf = conf;

    let credentials = conf.credentials;

    if (typeof credentials === 'string') {
      const credentialsFile = fs.readFileSync(path.resolve(credentials));

      credentials = JSON.parse(credentialsFile.toString());
    }

    const { client_email, private_key } = credentials as Credentials;

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
