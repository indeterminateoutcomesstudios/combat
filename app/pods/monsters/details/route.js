import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {

  model({ monster_id }) {
    return this.store.findRecord('monster', monster_id);
  },

  setupController(controller, model) {
    controller.set('name', model.get('name'));
    this._super(controller, model);
  }

});
