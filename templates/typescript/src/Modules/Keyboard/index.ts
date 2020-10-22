import { Markup } from 'telegraf';
// eslint-disable-next-line import/no-unresolved
import { KeyboardButton } from 'telegraf/typings/markup';

class Keyboard {
  public markup = (buttons: KeyboardButton[][] | KeyboardButton[]) =>
    Markup.keyboard(buttons).oneTime().resize().extra();

  public remove = () => Markup.removeKeyboard();

  public genericButtons = [['Voltar ao menu anterior'], ['Sair']];
}

export default Keyboard;
