#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var commander_1 = require("commander");
var configuration_1 = require("./configuration");
var documentLoader_1 = __importDefault(require("./documentLoader"));
var program = new commander_1.Command();
program
    .version('1.0.0', '-v, --version', 'Output the current version')
    .description('A CLI to manage localization based on google sheets');
program.addOption(new commander_1.Option('-c, --config <config>', 'Configuration file path')
    .default('i18n-gs.json')
    .makeOptionMandatory(true));
program.parse();
var options = program.opts();
var config = options.config;
var configuration = (0, configuration_1.loadConfiguration)(path_1.default.resolve(config));
if (configuration) {
    var docLoader = new documentLoader_1.default(configuration);
    docLoader.process();
}
