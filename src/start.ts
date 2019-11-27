import '@pefish/js-node-assist'
import commander from 'commander'
import chalk from 'chalk'
import InterfaceTemplate from './template/interface_template'
import TsLib from './template/ts_lib'
import ShellHelper from '@pefish/js-helper-shell'
import TsApp from './template/ts_app'
import Electron from './template/electron'
import GolangWebServer from './template/golang_web_server'

const packageJson = require('../package.json')

const templateMap: {[type: string]: InterfaceTemplate} = {
  react: null,
  electron: new Electron(),
  [`golang-web-server`]: new GolangWebServer(),
  [`nodejs-web-server`]: null,
  [`ts-app`]: new TsApp(),
  [`ts-lib`]: new TsLib(),
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
  .parse(process.argv);

if (!templateMap[appType]) {
  console.error(`暂不支持此类型`)
  process.exit(1)
}
const shellHelper = new ShellHelper()
templateMap[appType].do(shellHelper, projectName, program[`desc`])
if (program[`repo`]) {
  shellHelper.execSync(`git init`)
  shellHelper.execSync(`git remote add origin ${program[`repo`]}`)
}
console.info(`done !!!`)
