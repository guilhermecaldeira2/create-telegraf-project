import { Answers, ListQuestion } from 'inquirer';
import { IArgument, optionSpec } from '@argumentContext/index';

class TemplateArg implements IArgument {
  argName = 'template';
  run = (rawArgs: string[]): optionSpec => {
    return {
      template: 'false',
    };
  };

  missingOption = (options: optionSpec): ListQuestion<Answers> | void => {
    if (options[this.argName] && options[this.argName] === 'false') {
      return {
        type: 'list',
        name: 'template',
        message: 'Please, choose which project template to use',
        choices: ['Javascript', 'Typescript'],
        default: 'Typescript',
      };
    }
  };
}

export default TemplateArg;
