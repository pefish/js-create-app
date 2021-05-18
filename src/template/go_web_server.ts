import InterfaceTemplate from './interface_template'
import ShellHelper from '@pefish/js-helper-shell'

export default class GoWebServer implements InterfaceTemplate {
  getTemplateRepoUrl(): string {
    return `https://github.com/pefish/create-golang-webserver-template.git`
  }
  do(shellHelper: ShellHelper, projectName: string, desc: string, repoUrl: string, otherArgs: string[]): void {
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b master --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.execSync(`cat go.mod | sed "s/_template_/${projectName}/g" > temp && rm -rf go.mod && mv temp go.mod`)
    shellHelper.execSync(`cp config/sample.yaml config/local.yaml`)
    shellHelper.execSync(`cp secret/sample.yaml secret/local.yaml`)
  }

}
