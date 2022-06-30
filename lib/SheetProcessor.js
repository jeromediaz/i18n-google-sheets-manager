"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SheetProcessor = /** @class */ (function () {
    function SheetProcessor(sheet) {
        this.keyRow = 0;
        this.rowCount = 0;
        this.sheet = sheet;
    }
    SheetProcessor.prototype.process = function () {
        var _this = this;
        return this.sheet.getRows().then(function () {
            var locales = [];
            var localesIndex = {};
            var i18n = {};
            var headerValues = _this.sheet.headerValues;
            _this.rowCount = _this.sheet.rowCount;
            headerValues.forEach(function (headerValue, index) {
                var trimmed = headerValue.trim().toLowerCase();
                if (!trimmed) {
                    return;
                }
                if (trimmed === 'key') {
                    _this.keyRow = index;
                    return;
                }
                if (trimmed.charAt(0) === '#') {
                    return;
                }
                locales.push(trimmed);
                localesIndex[trimmed] = index;
            });
            locales.forEach(function (locale) {
                i18n[locale] = {};
            });
            return _this.sheet.loadCells().then(function () {
                var successiveNullKeys = 0;
                var _loop_1 = function (rowIndex) {
                    var rowKey = _this.sheet.getCell(rowIndex, _this.keyRow)
                        .value;
                    if (successiveNullKeys > 5) {
                        return "break";
                    }
                    if (!rowKey) {
                        successiveNullKeys++;
                        return "continue";
                    }
                    else {
                        successiveNullKeys = 0;
                    }
                    rowKey = rowKey.trim();
                    if (rowKey.charAt(0) === '#') {
                        return "continue";
                    }
                    locales.forEach(function (locale) {
                        var localeIndex = localesIndex[locale];
                        var value = _this.sheet.getCell(rowIndex, localeIndex).value || '';
                        i18n[locale][rowKey] = value === '#key#' ? rowKey : value;
                    });
                };
                for (var rowIndex = 1; rowIndex < _this.rowCount; rowIndex++) {
                    var state_1 = _loop_1(rowIndex);
                    if (state_1 === "break")
                        break;
                }
                return i18n;
            });
        });
    };
    return SheetProcessor;
}());
exports.default = SheetProcessor;
