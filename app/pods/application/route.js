import Ember from 'ember';

export default Ember.Route.extend({

  electron: Ember.inject.service(),

  activate() {
    this.get('electron')
      .on('show:welcome', this.redirectToWelcome.bind(this));
  },

  redirectToWelcome() {
    this.transitionTo('index');
  }

});
