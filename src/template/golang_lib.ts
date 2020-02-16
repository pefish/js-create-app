import InterfaceTemplate from './interface_template'
import ShellHelper from '@pefish/js-helper-shell'

export default class GolangLib implements InterfaceTemplate {
  getTemplateRepoUrl(): string {
    return `https://github.com/pefish/create-golang-lib-template.git`
  }

  do(shellHelper: ShellHelper, projectName: string, desc: string, repoUrl: string, otherArgs: string[]): void {
    if (!repoUrl) {
      throw new Error(`repo url is required`)
    }
    let packageName: string = ``
    const atPos = repoUrl.indexOf(`@`)
    if (atPos !== -1) {
      const colonPos = repoUrl.indexOf(`:`)
      packageName = repoUrl.substring(atPos + 1, colonPos) + `/` + repoUrl.substring(colonPos + 1, repoUrl.indexOf(`.git`))
    } else {
      packageName = repoUrl.substring(repoUrl.indexOf(`//`) + 2, repoUrl.indexOf(`.git`))
    }
    if (!packageName) {
      throw new Error(`packageName parse error`)
    }
    
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b master --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.execSync(`cat go.mod | sed "s/create_golang_lib_template/${packageName.replaceAll_(`/`, "\\\/")}/g" > temp && rm -rf go.mod && mv temp go.mod`)
  }

}
