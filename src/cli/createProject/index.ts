import chalk from 'chalk';
import fs from 'fs';
import { execSync } from 'child_process';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { argSpec } from '@modules/argumentContext/';

interface IProjectCreated {
  workspaceName: string;
  workspaceTarget: string;
}

class CreateProject {
  private async createProjectFolder(targetDirectory: string) {
    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory);
    }
  }

  private async copyTemplateFiles(templateDirectory: string, targetDirectory: string) {
    const copy = promisify(ncp);
    return copy(templateDirectory, targetDirectory, {
      clobber: false,
    });
  }

  private async runNpmCommands(templateOption: string, workspaceName: string) {
    const templates: {
      [x: string]: string[];
    } = {
      javascript: ['npm i'],
      typescript: ['npm i'],
    };

    if (!templates[templateOption]) throw new Error('Unhandled template');

    const commands = templates[templateOption];

    commands.forEach((cmd) => execSync(`cd ${workspaceName} && ${cmd}`, { stdio: 'inherit' }));
  }

  public async createProject(options: argSpec): Promise<IProjectCreated> {
    const access = promisify(fs.access);
    const templateOption = options.template.toLowerCase();
    const workspaceName: string = (options.workspaceName as unknown) as string;
    const templateDir = path.resolve(path.join(__dirname, '../../..templates', templateOption));
    const workspaceTarget = path.resolve(path.join(process.cwd(), workspaceName));

    try {
      await access(templateDir, fs.constants.R_OK);
    } catch (err) {
      console.error('%s Invalid template name', chalk.red.bold('ERROR'));
      process.exit(1);
    }

    console.log('Create project folder');
    try {
      await this.createProjectFolder(workspaceTarget);
      console.log(chalk.green('Done...'));
    } catch (err) {
      console.error("%s Can't create folder", chalk.red.bold('ERROR'));
      process.exit(1);
    }

    console.log('Copy project files');
    try {
      await this.copyTemplateFiles(templateDir, workspaceTarget);
      console.log(chalk.green('Done...'));
    } catch (err) {
      console.error("%s Can't copy project folder", chalk.red.bold('ERROR'));
      process.exit(1);
    }

    console.log('Install dependencies');
    try {
      await this.runNpmCommands(templateOption, workspaceName);
      console.log(chalk.green('Done...'));
    } catch (err) {
      console.error("%s Can't run npm commands", chalk.red.bold('ERROR'));
      process.exit(1);
    }

    console.log('%s Project ready', chalk.green.bold('DONE'));
    return {
      workspaceName,
      workspaceTarget,
    };
  }
}

export default CreateProject;
