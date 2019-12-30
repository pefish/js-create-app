import ShellHelper from '@pefish/js-helper-shell'

export default interface InterfaceTemplate {
  do (shellHelper: ShellHelper, projectName: string, desc: string, opts: {[x: string]: any}): void
  getTemplateRepoUrl (): string
}
