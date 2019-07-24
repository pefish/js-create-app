import '@pefish/js-node-assist'
import commander from 'commander'
import chalk from 'chalk'
import ShellHelper from '@pefish/js-helper-shell'

const packageJson = require('../package.json')

let projectName
const program = new commander.Command(packageJson.name)
  .version(packageJson.version, '-v, --version')
  .arguments('<project-directory>')
  .name(packageJson.appName)
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectName = name
  })
  // .option('--verbose', 'print additional logs')
  .allowUnknownOption()
  .parse(process.argv);

const shellHelper = new ShellHelper()
shellHelper.execSync(`git clone git@github.com:pefish/create-electron-app-template.git --single-branch -v -b master --depth 1 ${projectName}`)
shellHelper.cd(projectName)
shellHelper.execSync(`rm -rf .git .gitignore`)
shellHelper.execSync(`cd client && cat package.json | sed "s/template/${projectName}/g" > temp.json && rm -rf package.json && mv temp.json package.json`)
shellHelper.execSync(`cd server && cat package.json | sed "s/template/${projectName}/g" > temp.json && rm -rf package.json && mv temp.json package.json`)
shellHelper.execSync(`cd client && yarn`)
shellHelper.execSync(`cd server && yarn`)
shellHelper.execAsync(`cd client && yarn start`, () => {})
shellHelper.execSync(`cd server && yarn start`)
global.logger.info(`done !!!`)