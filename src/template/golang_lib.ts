import InterfaceTemplate from './interface_template'
import ShellHelper from '@pefish/js-helper-shell'

export default class GolangLib implements InterfaceTemplate {
  getTemplateRepoUrl(): string {
    return `git@github.com:pefish/create-golang-lib-template.git`
  }

  do(shellHelper: ShellHelper, projectName: string, desc: string, opts: {[x: string]: any}): void {
    if (!opts.packageName) {
      throw new Error(`packageName must be setted`)
    }
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b master --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.execSync(`cat go.mod | sed "s/create_golang_lib_template/${opts.packageName}/g" > temp && rm -rf go.mod && mv temp go.mod`)
    shellHelper.execSync(`yarn`)
  }

}
