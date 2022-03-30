import InterfaceTemplate from './interface_template'
import ShellHelper from '@pefish/js-helper-shell'

export default class RustApp implements InterfaceTemplate {
  getTemplateRepoUrl(): string {
    return `https://github.com/pefish/create-rust-app-template.git`
  }

  do(shellHelper: ShellHelper, projectName: string, desc: string, repoUrl: string, otherArgs: string[]): void {
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b master --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.withEnv("NAME", projectName).withEnv("DESC", desc).execSync(`./init.sh`)
    shellHelper.execSync(`rm -rf ./init.sh`)
  }

}
