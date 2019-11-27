import InterfaceTemplate from './interface_template'
import ShellHelper from '@pefish/js-helper-shell'

export default class GolangWebServer implements InterfaceTemplate {
  getTemplateRepoUrl(): string {
    return `git@github.com:pefish/create-golang-webserver-template.git`
  }
  do(shellHelper: ShellHelper, projectName: string, desc: string): void {
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b master --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.execSync(`cat go.mod | sed "s/_template_/${projectName}/g" > temp && rm -rf go.mod && mv temp go.mod`)
    shellHelper.execSync(`cat main.go | sed "s/_template_/${projectName}/g" > temp && rm -rf main.go && mv temp main.go`)
    shellHelper.execSync(`cat route/login.go | sed "s/_template_/${projectName}/g" > route/temp && rm -rf route/login.go && mv route/temp route/login.go`)
    shellHelper.execSync(`cp config/sample.yaml config/local.yaml`)
    shellHelper.execSync(`cp secret/sample.yaml secret/local.yaml`)
  }

}
