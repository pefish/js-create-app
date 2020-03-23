import '@pefish/js-node-assist'
import commander, { Command } from 'commander'
import chalk from 'chalk'
import InterfaceTemplate from './template/interface_template'
import TsLib from './template/ts_lib'
import GolangLib from './template/golang_lib'
import ShellHelper from '@pefish/js-helper-shell'
import TsApp from './template/ts_app'
import ReactApp from './template/react_app'
import Electron from './template/electron'
import GolangWebServer from './template/golang_web_server'
import GolangGrpcServer from './template/golang_grpc_server'
import GolangApp from './template/golang_app';
import RustApp from './template/rust_app';
import RustLib from './template/rust_lib';
import { exists } from 'fs';

const packageJson = require('../package.json')

const templateMap: {
  [type: string]: {
    instance: InterfaceTemplate,
    argsText: string,
    desc?: string,
  }
} = {
  [`electron`]: {
    instance: new Electron(),
    argsText: ``,
  },
  [`golang-web-server`]: {
    instance: new GolangWebServer(),
    argsText: ``,
  },
  [`golang-grpc-server`]: {
    instance: new GolangGrpcServer(),
    argsText: ``,
  },
  [`nodejs-web-server`]: {
    instance: null,
    argsText: ``,
  },
  [`ts-app`]: {
    instance: new TsApp(),
    argsText: ``,
  },
  [`ts-lib`]: {
    instance: new TsLib(),
    argsText: ``,
  },
  [`golang-lib`]: {
    instance: new GolangLib(),
    argsText: ``,
  },
  [`golang-app`]: {
    instance: new GolangApp(),
    argsText: ``,
  },
  [`react-app`]: {
    instance: new ReactApp(),
    argsText: `[base_path]`,
    desc: `example: react-app /test`,
  },
  [`rust-app`]: {
    instance: new RustApp(),
    argsText: ``,
  },
  [`rust-lib`]: {
    instance: new RustLib(),
    argsText: ``,
  },
}

let projectName, cmdObj, otherArgs
const program = commander
  .name(packageJson.appName)
  .version(packageJson.version, '-v, --version')
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .allowUnknownOption()
  .requiredOption('-t, --type [string]', `Type. Available: [${Object.keys(templateMap).join(",")}]`)
  .option('-r, --repo [string]', 'Repo to relate', ``)
  .option('-d, --desc [string]', 'Description', ``)


program
  .action((projectName_: string, cmdObj_: Command, otherArgs_: string[]) => {
    projectName = projectName_
    cmdObj = cmdObj_
    otherArgs = otherArgs_
  })
  .parse(process.argv);


const shellHelper = new ShellHelper()
const oldCwd = process.cwd()
let isCurrentDir = (projectName === `.` || projectName === `./`)
if (isCurrentDir) {
  projectName = "temp_"
}
if (!templateMap[program.type]) {
  console.error(`type error`)
  process.exit(1)
}

templateMap[program.type].instance.do(shellHelper, projectName, program.desc, program.repo, otherArgs)
if (isCurrentDir) {
  shellHelper.cd(oldCwd)
  shellHelper.execSync(`mv ${projectName}/[^.]* ./ && rm -rf ${projectName}/`)
}
if (program.repo) {
  shellHelper.execSync(`git init`)
  shellHelper.execSync(`git remote add origin ${program.repo}`)
}
console.info(`done !!!`)
