import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {

  model() {
    return this.store.createRecord('monster');
  },

  setupController(controller, model) {
    controller.set('name', model.get('name'));
    this._super(controller, model);
  }

});
