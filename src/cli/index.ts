import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import ArgumentContext from '@argumentContext/index';
import GitArg from '@commands/git';
import TemplateArg from '@commands/template';
import WorkspaceNameArg from '@commands/workspaceName';
import ICLI from 'src/ICLI';

class CLI implements ICLI {
  private argumentContext;
  private gitArg;
  private templateArg;
  private workspaceNameArg;
  constructor() {
    this.argumentContext = new ArgumentContext();
    this.gitArg = new GitArg();
    this.templateArg = new TemplateArg();
    this.workspaceNameArg = new WorkspaceNameArg();
  }
  registerArgs() {
    this.argumentContext.register(this.workspaceNameArg);
    this.argumentContext.register(this.gitArg);
    this.argumentContext.register(this.templateArg);
  }
  async main(args: string[]) {
    clear();
    this.registerArgs();
    const options = await this.argumentContext.parseArguments(args);
    console.log(chalk.red(figlet.textSync('cha-de-bode', { horizontalLayout: 'full' })));
    console.log(options);
  }
}

export default CLI;
