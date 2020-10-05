import inquirer, { Answers, ListQuestion, Question } from 'inquirer';

export interface optionSpec {
  [x: string]: string | boolean;
}

export interface argSpec {
  [x: string]: optionSpec | Answers;
}

export interface IArgument {
  argName: string;
  run: (rawArgs: string[]) => optionSpec;
  missingOption?: (options: optionSpec) => Question<Answers> | ListQuestion<Answers> | void;
}

class ArgumentContext {
  private arguments: IArgument[];

  constructor() {
    this.arguments = [];
  }

  public register(argument: IArgument) {
    this.arguments.push(argument);
  }

  public unregister(argName: string) {
    this.arguments.filter((el: IArgument) => el.argName !== argName);
  }

  private parseArgumentsIntoOptions(rawArgs: string[]): optionSpec {
    let options: optionSpec = {};
    this.arguments.forEach((arg: IArgument) => (options = { ...options, ...arg.run(rawArgs) }));
    return options;
  }

  private parseArgumentsIntoMissing(options: optionSpec): Question<Answers>[] {
    const questions: Question[] = [];
    this.arguments.forEach((arg: IArgument) => {
      if (arg.missingOption) {
        const question = arg.missingOption(options);
        if (question) questions.push(question);
      }
    });
    return questions;
  }

  public async parseArguments(rawArgs: string[]): Promise<argSpec> {
    let argsParsed: argSpec = {};
    const preOptions = this.parseArgumentsIntoOptions(rawArgs);
    const questions = this.parseArgumentsIntoMissing(preOptions);
    const answers = await inquirer.prompt(questions);
    Object.entries(preOptions).forEach((opt) => {
      const arg =
        opt[1] === 'false' ? { [opt[0]]: answers[opt[0]] } : { [opt[0]]: preOptions[opt[0]] };
      argsParsed = { ...argsParsed, ...arg };
    });
    return argsParsed;
  }
}

export default ArgumentContext;
