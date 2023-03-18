import InterfaceTemplate from './interface_template'
import ShellHelper from '@pefish/js-helper-shell'

export default class RustLib implements InterfaceTemplate {
  getTemplateRepoUrl(): string {
    return `https://github.com/pefish/create-rust-lib-template`
  }

  do(shellHelper: ShellHelper, projectName: string, desc: string, repoUrl: string, otherArgs: string[]): void {
    shellHelper.execSync(`git clone ${this.getTemplateRepoUrl()} --single-branch -v -b main --depth 1 ${projectName}`)
    shellHelper.cd(projectName)
    shellHelper.execSync(`rm -rf .git`)
    shellHelper.execSync(`cat Cargo.toml | sed "s/create-rust-lib-template/${projectName}/g" > temp && rm -rf Cargo.toml && mv temp Cargo.toml`)
    shellHelper.execSync(`cat Cargo.toml | sed "s/_description_/${desc}/g" > temp && rm -rf Cargo.toml && mv temp Cargo.toml`)
    shellHelper.execSync(`cargo update`)
  }

}
