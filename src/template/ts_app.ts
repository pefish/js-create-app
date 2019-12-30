import InterfaceTemplate from './interface_template'
import ShellHelper from '@pefish/js-helper-shell'

export default class TsApp implements InterfaceTemplate {
  getTemplateRepoUrl(): string {
    return `git@github.com:pefish/create-typescript-app-template.git`
  }

  do(shellHelper: ShellHelper, projectName: string, desc: string, repoUrl: string, opts: {[x: string]: any}): void {
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b master --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.execSync(`cat package.json | sed "s/template_name/${projectName}/g" > temp.json && rm -rf package.json && mv temp.json package.json`)
    shellHelper.execSync(`cat package.json | sed "s/template_description/${desc}/g" > temp.json && rm -rf package.json && mv temp.json package.json`)
    shellHelper.execSync(`yarn`)
    shellHelper.execSync(`cp config/sample.yaml config/local.yaml`)
  }

}
