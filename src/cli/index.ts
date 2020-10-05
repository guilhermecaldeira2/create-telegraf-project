import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import ICLI from '@modules/ICLI';
import ArgumentContext from '@modules/argumentContext/index';
import GitArg from '@commands/git';
import TemplateArg from '@commands/template';
import WorkspaceNameArg from '@commands/workspaceName';
import CreateProject from '@cli/createProject';

class CLI implements ICLI {
  private argumentContext;
  private gitArg;
  private templateArg;
  private workspaceNameArg;
  private project;
  constructor() {
    this.argumentContext = new ArgumentContext();
    this.gitArg = new GitArg();
    this.templateArg = new TemplateArg();
    this.workspaceNameArg = new WorkspaceNameArg();
    this.project = new CreateProject();
  }
  registerArgs() {
    this.argumentContext.register(this.workspaceNameArg);
    this.argumentContext.register(this.gitArg);
    this.argumentContext.register(this.templateArg);
  }
  async main(args: string[]) {
    clear();
    this.registerArgs();
    console.log(chalk.red(figlet.textSync('cha-de-bode', { horizontalLayout: 'full' })));
    const options = await this.argumentContext.parseArguments(args);
    await this.project.createProject(options);
    if (options && options.workspaceName) {
      console.log('%s use:', chalk.yellow('NOW'));
      console.log(`cd ${options.workspaceName}`);
      console.log('npm run dev');
    }
  }
}

export default CLI;
