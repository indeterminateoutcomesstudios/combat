import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    didTransition() {
      this.controllerFor('player-characters').send('startCreate');
    }
  }

});
