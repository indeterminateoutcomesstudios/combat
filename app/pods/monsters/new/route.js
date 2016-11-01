import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    didTransition() {
      this.controllerFor('monsters').send('startCreate');
    }
  }

});
