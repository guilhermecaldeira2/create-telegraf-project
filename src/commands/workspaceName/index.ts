import arg from 'arg';
import { Answers, Question } from 'inquirer';
import { IArgument, argSpec, optionSpec } from '@modules/argumentContext/';

class WorkspaceNameArg implements IArgument {
  argName = 'workspaceName';
  run = (rawArgs: string[]): optionSpec => {
    const args = arg(
      {},
      {
        argv: rawArgs.slice(2),
      }
    );
    return {
      workspaceName: args._[0] || 'false',
    };
  };

  missingOption = (options: optionSpec): Question<Answers> | void => {
    if (options[this.argName] && options[this.argName] === 'false') {
      return {
        type: 'input',
        name: 'workspaceName',
        message: 'Please, enter a valid name for new project',
      };
    }
  };
}

export default WorkspaceNameArg;
