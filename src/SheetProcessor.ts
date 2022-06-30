import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

export type I18nKey = {
  [key: string]: string;
};

export type I18nMap = {
  [key: string]: I18nKey;
};

type LocaleIndex = {
  [key: string]: number;
};

export default class SheetProcessor {
  sheet: GoogleSpreadsheetWorksheet;
  keyRow = 0;
  rowCount = 0;

  constructor(sheet: GoogleSpreadsheetWorksheet) {
    this.sheet = sheet;
  }

  process(): Promise<I18nMap> {
    return this.sheet.getRows().then(() => {
      const locales = [] as string[];

      const localesIndex = {} as LocaleIndex;

      const i18n = {} as I18nMap;
      const headerValues = this.sheet.headerValues;

      this.rowCount = this.sheet.rowCount;

      headerValues.forEach((headerValue, index) => {
        const trimmed = headerValue.trim().toLowerCase();
        if (!trimmed) {
          return;
        }
        if (trimmed === 'key') {
          this.keyRow = index;
          return;
        }
        if (trimmed.charAt(0) === '#') {
          return;
        }

        locales.push(trimmed);
        localesIndex[trimmed] = index;
      });

      locales.forEach((locale) => {
        i18n[locale] = {};
      });

      return this.sheet.loadCells().then(() => {
        let successiveNullKeys = 0;

        for (let rowIndex = 1; rowIndex < this.rowCount; rowIndex++) {
          let rowKey = this.sheet.getCell(rowIndex, this.keyRow)
            .value as string;
          if (successiveNullKeys > 5) {
            break;
          }
          if (!rowKey) {
            successiveNullKeys++;
            continue;
          } else {
            successiveNullKeys = 0;
          }
          rowKey = rowKey.trim();

          if (rowKey.charAt(0) === '#') {
            continue;
          }

          locales.forEach((locale) => {
            const localeIndex = localesIndex[locale];
            const value =
              (this.sheet.getCell(rowIndex, localeIndex).value as string) || '';

            i18n[locale][rowKey] = value === '#key#' ? rowKey : value;
          });
        }
        return i18n;
      });
    });
  }
}
