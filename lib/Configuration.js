"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfiguration = void 0;
var fs_1 = __importDefault(require("fs"));
function loadConfiguration(path) {
    var jsonContent = fs_1.default.readFileSync(path, { encoding: 'utf-8' });
    var configuration = JSON.parse(jsonContent);
    if (configuration) {
        return configuration;
    }
    return undefined;
}
exports.loadConfiguration = loadConfiguration;
