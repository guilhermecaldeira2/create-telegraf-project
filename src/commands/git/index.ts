import arg from 'arg';
import { Answers, Question } from 'inquirer';
import { IArgument, argSpec, optionSpec } from '@argumentContext/index';

class GitArg implements IArgument {
  argName = 'git';
  run = (rawArgs: string[]): optionSpec => {
    const args = arg(
      {
        '--git': Boolean,
        '-g': '--git',
      },
      {
        argv: rawArgs.slice(2),
      }
    );
    return {
      git: args['--git'] || 'false',
    };
  };

  missingOption = (options: optionSpec): Question<Answers> | void => {
    if (options[this.argName] && options[this.argName] === 'false') {
      return {
        type: 'confirm',
        name: 'git',
        message: 'Initialize git repository?',
        default: false,
      };
    }
  };
}

export default GitArg;
