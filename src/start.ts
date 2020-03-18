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

const packageJson = require('../package.json')

const templateMap: {
  [type: string]: {
    instance: InterfaceTemplate,
    argsText: string,
    desc?: string,
  }
} = {
  electron: {
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

let projectName, commandName, cmdObj, otherArgs
const program = commander
  .name(packageJson.appName)
  .version(packageJson.version, '-v, --version')
  .arguments('<command> <project-directory>')
  .usage(`[command] ${chalk.green('<project-directory>')} [options]`)
  .allowUnknownOption()
  .option('-r, --repo [string]', 'repo to relate', ``)
  .option('-d, --desc [string]', 'description', ``)

for (const [k, v] of Object.entries(templateMap)) {
  program
    .command(`${k} ${v.argsText}`, `create ${k}. ${v.desc || ""}`)
}


program
  .action((commandName_: string, projectName_: string, cmdObj_: Command, otherArgs_: string[]) => {
    projectName = projectName_
    commandName = commandName_
    cmdObj = cmdObj_
    otherArgs = otherArgs_
  })
  .parse(process.argv);

// console.log(commandName)
const shellHelper = new ShellHelper()
const oldCwd = process.cwd()
let isCurrentDir = (projectName === `.` || projectName === `./`)
if (isCurrentDir) {
  projectName = "temp_"
}
templateMap[commandName].instance.do(shellHelper, projectName, program.desc, program.repo, otherArgs)
if (isCurrentDir) {
  shellHelper.cd(oldCwd)
  shellHelper.execSync(`mv ${projectName}/[^.]* ./ && rm -rf ${projectName}/`)
}
if (program.repo) {
  shellHelper.execSync(`git init`)
  shellHelper.execSync(`git remote add origin ${program.repo}`)
}
console.info(`done !!!`)
