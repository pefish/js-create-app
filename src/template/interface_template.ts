import ShellHelper from '@pefish/js-helper-shell'

export default interface InterfaceTemplate {
  do (shellHelper: ShellHelper, projectName: string, desc: string, repoUrl: string, otherArgs: string[]): void
  getTemplateRepoUrl (): string
}
