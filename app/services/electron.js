/* eslint-env node */

import Ember from 'ember';

let electronApp = null;
try {
  electronApp = require('electron').ipcRenderer;
} catch(err) {
  Ember.Logger.debug('Not running in Electron')
}

export default Ember.Service.extend({

  on(...args) {
    if (electronApp) {
      electronApp.on.call(electronApp, ...args);
    } else {
      Ember.Logger.warn('Attempted to listen to an Electron event, but not running in an Electron shell.');
    }
  }

});
