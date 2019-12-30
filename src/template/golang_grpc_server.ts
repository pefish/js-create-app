import InterfaceTemplate from './interface_template'
import ShellHelper from '@pefish/js-helper-shell'

export default class GolangGrpcServer implements InterfaceTemplate {
  getTemplateRepoUrl(): string {
    return `git@github.com:pefish/create-golang-grpcserver-template.git`
  }
  do(shellHelper: ShellHelper, projectName: string, desc: string, opts: {[x: string]: any}): void {
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b master --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.execSync(`cat go.mod | sed "s/_template_/${projectName}/g" > temp && rm -rf go.mod && mv temp go.mod`)
    shellHelper.execSync(`cat main.go | sed "s/_template_/${projectName}/g" > temp && rm -rf main.go && mv temp main.go`)
    shellHelper.execSync(`cat client/main.go | sed "s/_template_/${projectName}/g" > client/temp && rm -rf client/main.go && mv client/temp client/main.go`)
    shellHelper.execSync(`cat service/helloworld/helloworld.go | sed "s/_template_/${projectName}/g" > service/helloworld/temp && rm -rf service/helloworld/helloworld.go && mv service/helloworld/temp service/helloworld/helloworld.go`)
    shellHelper.execSync(`cp config/sample.yaml config/local.yaml`)
    shellHelper.execSync(`cp secret/sample.yaml secret/local.yaml`)
  }

}
