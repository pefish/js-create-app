import InterfaceTemplate from "./interface_template";
import ShellHelper from '@pefish/js-helper-shell'

export default class ReactApp implements InterfaceTemplate {
  do(shellHelper: ShellHelper, projectName: string, desc: string, repoUrl: string, opts: {[x: string]: any}): void {
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b master --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.execSync(`cat package.json | sed "s/template/${projectName}/g" > temp.json && rm -rf package.json && mv temp.json package.json`)
    shellHelper.execSync(`cd public && cat index.html | sed "s/template/${projectName}/g" > temp.html && rm -rf index.html && mv temp.html index.html`)
    shellHelper.execSync(`yarn`)
  }

  getTemplateRepoUrl(): string {
    return `git@github.com:pefish/create-react-app-template.git`
  }
}
