import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {

  model({ monster_id }) {
    return this.store.findRecord('monster', monster_id);
  },

  resetController() {
    this._super();
    // NOTE: At this point, attacks still belong to the `attacks` collection,
    // but are marked as `isDeleted`. This only works if they’re not removed
    // from the collection when deleted.
    this.currentModel.get('attacks').toArray()
      .forEach(a => a.rollbackAttributes());
  },

  setupController(controller, model) {
    controller.set('name', model.get('name'));
    this._super(controller, model);
  }

});
