"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var mustache_1 = __importDefault(require("mustache"));
var BaseExporter = /** @class */ (function () {
    function BaseExporter(output) {
        this.output = output;
    }
    BaseExporter.keyPathExtractor = function (map, separator) {
        if (separator === false) {
            return map;
        }
        var extractedMap = {};
        Object.keys(map).forEach(function (key) {
            var splittedKeys = key.split(separator);
            var finalPath = splittedKeys.pop();
            if (!finalPath) {
                return;
            }
            var wrapperObject = splittedKeys.reduce(function (acc, subKey) {
                var subObject = acc[subKey];
                if (!subObject) {
                    subObject = {};
                    acc[subKey] = subObject;
                }
                return subObject;
            }, extractedMap);
            wrapperObject[finalPath] = map[key];
        });
        return extractedMap;
    };
    BaseExporter.prototype.process = function (map) {
        var _this = this;
        return promises_1.default
            .mkdir(path_1.default.resolve(this.output.outputDir), { recursive: true })
            .then(function () {
            var promises = Object.keys(map).map(function (locale) {
                return _this.processLocale(locale, map[locale]);
            });
            return Promise.all(promises).then(function () {
                // nothing to do
            });
        });
    };
    BaseExporter.prototype.extractValues = function (_values) {
        throw new Error('unimplemented method extractValues');
    };
    BaseExporter.prototype.defaultFileName = function (_locale) {
        throw new Error('unimplemented method extractValues');
    };
    BaseExporter.prototype.processLocale = function (locale, values) {
        var _this = this;
        var fileName = this.output.fileName
            ? mustache_1.default.render(this.output.fileName, { locale: locale })
            : this.defaultFileName(locale);
        var outputPath = path_1.default.resolve(this.output.outputDir, fileName);
        return promises_1.default
            .mkdir(path_1.default.dirname(outputPath), { recursive: true })
            .then(function () {
            return promises_1.default.writeFile(outputPath, _this.extractValues(values));
        });
    };
    return BaseExporter;
}());
exports.default = BaseExporter;
