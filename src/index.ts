#!/usr/bin/env node

import path from 'path';
import { Command, Option as COption } from 'commander';
import { loadConfiguration } from './configuration';
import DocumentLoader from './documentLoader';

const program = new Command();
program
  .version('0.0.1', '-v, --version', 'Output the current version')
  .description('A CLI to manage localization based on google sheets');

program.addOption(
  new COption('-c, --config <config>', 'Configuration file path')
    .default('i18n-gs.json')
    .makeOptionMandatory(true)
);

program.parse();

const options = program.opts();

const {config} = options;

const configuration = loadConfiguration(path.resolve(config));
if (configuration) {
  console.log(configuration);
  const docLoader = new DocumentLoader(configuration);
  docLoader.process();

}

