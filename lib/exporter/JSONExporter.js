"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseExporter_1 = __importDefault(require("./BaseExporter"));
var JSONExporter = /** @class */ (function (_super) {
    __extends(JSONExporter, _super);
    function JSONExporter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONExporter.prototype.extractValues = function (values) {
        var extractedValues = BaseExporter_1.default.keyPathExtractor(values, this.output.keyPathSeparator || '.');
        return JSON.stringify(extractedValues, null, 2);
    };
    JSONExporter.prototype.defaultFileName = function (locale) {
        return "".concat(locale, ".json");
    };
    return JSONExporter;
}(BaseExporter_1.default));
exports.default = JSONExporter;
