"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var google_spreadsheet_1 = require("google-spreadsheet");
var Exporter_1 = __importDefault(require("./exporter/Exporter"));
var SheetProcessor_1 = __importDefault(require("./SheetProcessor"));
var DocumentLoader = /** @class */ (function () {
    function DocumentLoader(conf) {
        var _this = this;
        this.doc = new google_spreadsheet_1.GoogleSpreadsheet(conf.docID);
        this.conf = conf;
        var _a = conf.credentials, client_email = _a.client_email, private_key = _a.private_key;
        this.docLoading = this.doc
            .useServiceAccountAuth({ client_email: client_email, private_key: private_key })
            .then(function () {
            return _this.doc.loadInfo();
        });
    }
    DocumentLoader.prototype.process = function () {
        var _this = this;
        return this.docLoading.then(function () {
            var promises = _this.conf.outputs.map(function (output) {
                console.log(output);
                if (output.sheetIndex !== undefined) {
                    var sheetProcessor = new SheetProcessor_1.default(_this.doc.sheetsByIndex[output.sheetIndex]);
                    sheetProcessor.process().then(function (i18nLocale) {
                        var exporter = (0, Exporter_1.default)(output);
                        return exporter.process(i18nLocale);
                    });
                }
            });
        });
    };
    return DocumentLoader;
}());
exports.default = DocumentLoader;
