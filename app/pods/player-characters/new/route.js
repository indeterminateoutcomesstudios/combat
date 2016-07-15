import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {

  model() {
    return this.store.createRecord('player-character');
  },

  setupController(controller, model) {
    controller.set('name', '');
    this._super(controller, model);
  }

});
