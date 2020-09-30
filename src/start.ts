import '@pefish/js-node-assist'
import commander, { Command } from 'commander'
import chalk from 'chalk'
import InterfaceTemplate from './template/interface_template'
import TsLib from './template/ts_lib'
import GoLib from './template/go_lib'
import ShellHelper from '@pefish/js-helper-shell'
import TsApp from './template/ts_app'
import ReactApp from './template/react_app'
import Electron from './template/electron'
import GoWebServer from './template/go_web_server'
import GoGrpcServer from './template/go_grpc_server'
import GoApp from './template/go_app';
import RustApp from './template/rust_app';
import RustLib from './template/rust_lib';
import ReactDApp from './template/react_dapp'

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
  [`go-web-server`]: {
    instance: new GoWebServer(),
    argsText: ``,
  },
  [`go-grpc-server`]: {
    instance: new GoGrpcServer(),
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
  [`go-lib`]: {
    instance: new GoLib(),
    argsText: ``,
  },
  [`go-app`]: {
    instance: new GoApp(),
    argsText: ``,
  },
  [`react-app`]: {
    instance: new ReactApp(),
    argsText: ``,
  },
  [`react-dapp`]: {
    instance: new ReactDApp(),
    argsText: ``,
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
  .requiredOption('-t, --type [string]', `type. available: [${Object.keys(templateMap).join(",")}]`)
  .option('-r, --repo [string]', 'repo to relate', ``)
  .option('-d, --desc [string]', 'description', ``)


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
