import '@pefish/js-node-assist'
import commander from 'commander'
import chalk from 'chalk'
import InterfaceTemplate from './template/interface_template'
import TsLib from './template/ts_lib'
import GolangLib from './template/golang_lib'
import ShellHelper from '@pefish/js-helper-shell'
import TsApp from './template/ts_app'
import Electron from './template/electron'
import GolangWebServer from './template/golang_web_server'
import GolangGrpcServer from './template/golang_grpc_server'

const packageJson = require('../package.json')

const templateMap: {[type: string]: InterfaceTemplate} = {
  react: null,
  electron: new Electron(),
  [`golang-web-server`]: new GolangWebServer(),
  [`golang-grpc-server`]: new GolangGrpcServer(),
  [`nodejs-web-server`]: null,
  [`ts-app`]: new TsApp(),
  [`ts-lib`]: new TsLib(),
  [`golang-lib`]: new GolangLib(),
}

let projectName, appType
const program = new commander.Command(packageJson.name)
  .version(packageJson.version, '-v, --version')
  .arguments('<app-type> <project-directory>')
  .name(packageJson.appName)
  .usage(`${chalk.green(`<${Object.keys(templateMap).join('|')}>`)} ${chalk.green('<project-directory>')} [options]`)
  .action((appType_, projectName_) => {
    projectName = projectName_
    appType = appType_
  })
  .allowUnknownOption()
  .option('-r, --repo [string]', 'repo to relate', ``)
  .option('-d, --desc [string]', 'description', ``)
  .option('-o, --other [string]', 'other data. json string', `{}`)
  .parse(process.argv);

if (!templateMap[appType]) {
  console.error(`暂不支持此类型`)
  process.exit(1)
}
const shellHelper = new ShellHelper()
templateMap[appType].do(shellHelper, projectName, program.desc, program.repo, JSON.parse(program.other))
if (program.repo) {
  shellHelper.execSync(`git init`)
  shellHelper.execSync(`git remote add origin ${program.repo}`)
}
console.info(`done !!!`)
