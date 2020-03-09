#!/usr/bin/env node

//依赖
const fs = require('fs');
const path = require('path');
const flatten = require('flat');
const unflatten = require('flat').unflatten;
const commander = require('commander');
const validator = require('validator');
const compareVersions = require('compare-versions');
const exec = require('child_process').exec;

//功能模块
const logger = require('../lib/logger');
const subBuild = require('../lib/sub-build');
const patchVersion = require('../lib/patch-version');
const { getNewVersion } = require('../lib/utils');
const bs_package = require('../package.json');
const publish = require('../lib/publish');
const batch = require('../lib/batch');

//constants
const config = require('../lib/constant');
// 必须在.parse()之前，因为node的emit()是即时的
commander
  .version(bs_package.version, `-v, --version`)
  .option(
    '--batch, batch',
    `[option] Required. Batch executing commands for this path
                              '--cmd [option]' will be executed for each item
                              '--except [option]' will be joinned to the filter arr
  `
  )
  .option(
    '--sub-build, subBuild',
    `Resolve alias in './src' and output dist and get current package latest version and patch it in 'package.json'.
                              [option] Not Required. The path is the subBuild exec path, and default is current path.
                              Usually it will be used in prepublish of npm hooks.
    `
  )
  .option(
    '--patch-version, patch',
    `Update package.json version to latest and npm version patch version  without commit.
                              [option] Not Required. The path is the patch exec path, and default is current path.
                              '--implicit-publish' will publish the implicitly package when it is not in npm regirstry.
    `
  )
  .option(
    '--publish, publish',
    `[option] Required. Batch publish packages in this path and it will be joined to the second quene.
                              '--first [option]' will be joined to the first queue to publish.
                              '--master [option]' will not be joined to the last queue to build after all queues completed.
                              '--except [option]' will be joinned to the filter arr which will not be publish.
                              '--git-pull-parameter [option]' will be connect with 'git pull' for git repository.
                              '--no-git' will skip git repository check and fetch.
                              '--normal-install' default, will keep node_modules and npm install and npm update before build.
                              '--full-install' will clear node_modules and npm install before build.
                        `
  );

commander.parse(process.argv);

let arg = process.argv;

const currentPath =
  arg[3] && !/^--/.test(arg[3])
    ? path.resolve(process.cwd(), arg[3])
    : process.cwd();
logger.success(`bs-cli version: "${bs_package.version}"`);
// bs publish
if (commander.publish) {
  //check node and npm version
  exec('npm -v', function(error, stdout, stderr) {
    if (!error) {
      const currentVersion = process.version.replace(/v/g, '');
      const nodeVersion = '8.10.0';
      const flag = compareVersions(currentVersion, nodeVersion);
      if (flag < 0) {
        logger.err(
          `Unexpected version: node version should be higher than "v8.10.0",but got "v${currentVersion}" !`,
          false,
          true
        );
      } else {
        logger.success(`node version: "${process.version}"`);
        logger.success(
          `npm version: "v${stdout.replace(/(\r\n\t|\n|\r\t)/gm, '')}"`
        );

        //check npm registry
        let currentRegistry = '';
        exec('npm config get registry', (error, stdout, stderr) => {
          if (!error) {
            currentRegistry = stdout.replace(/(\r\n\t|\n|\r\t)/gm, '');
            if (!currentRegistry.includes('http://10.100.1.25:4873/')) {
              logger.err(
                `Unexpected npm rigistry: expect "http://10.100.1.25:4873/", but got "${currentRegistry}" !`,
                false,
                true
              );
            } else {
              logger.success(`npm rigistry: "${currentRegistry}"`);
              publish(arg);
            }
          } else {
            logger.err(error, false, true);
          }
        });
      }
    }
  });
}
// bs patch
else if (commander.patch) {
  patchVersion(currentPath, arg);
}
// bs batch
else if (commander.batch) {
  batch(arg);
}
// bs sub build
else if (commander.subBuild) {
  subBuild(currentPath, arg);
}
// error tip
else {
  const param = arg[2] || '';
  logger.success(
    `bs: '${param}' not a bs command! Please refer to 'bs --help'.`
  );

  if (param) {
    const arr = config.cmds.filter(v => v.includes(param));
    arr.forEach((v, p) => {
      if (p === 0) {
        logger.success('Are you referring to one of these?');
      }
      logger.success('bs ' + v);
    });
    if (arr.length === 0) {
      logger.success(commander.help());
    }
  } else {
    logger.success(commander.help());
  }
}
