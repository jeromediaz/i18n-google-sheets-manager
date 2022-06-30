"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var mustache_1 = __importDefault(require("mustache"));
var JSONExporter = /** @class */ (function () {
    function JSONExporter(output) {
        this.output = output;
    }
    JSONExporter.prototype.process = function (map) {
        var _this = this;
        return promises_1.default.mkdir(path_1.default.resolve(this.output.outputDir), { recursive: true }).then(function () {
            var promises = Object.keys(map).map(function (locale) {
                return _this.processLocale(locale, map[locale]);
            });
            return Promise.all(promises).then(function () {
                // nothing to do
            });
        });
    };
    JSONExporter.prototype.processLocale = function (locale, values) {
        var fileName = this.output.fileName ? mustache_1.default.render(this.output.fileName, { locale: locale }) : "".concat(locale, ".json");
        var outputPath = path_1.default.resolve(this.output.outputDir, fileName);
        return promises_1.default.mkdir(path_1.default.dirname(outputPath), { recursive: true }).then(function () {
            return promises_1.default.writeFile(outputPath, JSON.stringify(values, null, 2));
        });
    };
    return JSONExporter;
}());
exports.default = JSONExporter;
