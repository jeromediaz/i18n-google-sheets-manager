"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var JSONExporter_1 = __importDefault(require("./JSONExporter"));
var YAMLExporter_1 = __importDefault(require("./YAMLExporter"));
var METHODS = {
    json: JSONExporter_1.default,
    yaml: YAMLExporter_1.default,
};
function buildExporter(output) {
    var lowerCasedMethod = output.method.toLowerCase();
    var ExporterClass = METHODS[lowerCasedMethod];
    if (ExporterClass) {
        return new ExporterClass(output);
    }
    throw new Error('unsupported output method ' + output);
}
exports.default = buildExporter;
