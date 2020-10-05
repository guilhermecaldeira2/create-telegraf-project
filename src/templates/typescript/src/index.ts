import { Telegraf, session, Stage } from 'telegraf';
import * as env from '@Config/config.json';
import Scenes from '@Scenes/index';
import Keyboard from '@Modules/Keyboard';
import { previousMenu, exit } from '@Scenes/Middlewares/Generic';
import { Connection } from './Connection';

({
  bot: new Telegraf(env.TELEGRAM_TOKEN),
  connection: new Connection(),
  stage: new Stage(Scenes),
  keyboard: new Keyboard(),

  databaseConnection: async function databaseConnection() {
    return this.connection.connect();
  },

  handleBot: function handleBot() {
    this.bot.use(session());
    this.bot.use(this.stage.middleware());

    this.bot.hears('Sair', exit);

    this.bot.hears('Voltar ao menu anterior', previousMenu);

    this.bot.start(async (ctx: any) => {
      ctx.session.history = [];
      ctx.scene.enter('');
    });

    this.bot.hears(/Oi/gi, async (ctx: any) => {
      ctx.session.history = [];
      ctx.scene.enter('');
    });

    return this.bot.launch();
  },

  init: async function init() {
    try {
      await this.databaseConnection();
      await this.handleBot();
    } catch (err) {
      console.error(err);
    }
  },
}.init());
