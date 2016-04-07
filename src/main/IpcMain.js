import { ipcMain } from 'electron';
import keys from '../shared/constants/keys';

export default class IpcMain {
  constructor() {
    this._setEvents();
  }

  destroy() {
    ipcMain.removeAllListeners();
  }

  _setEvents() {
    ipcMain.on(keys.RECEIVE_TWEET, (event, arg) => {

    });
  }
}
