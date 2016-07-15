import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {

  model({ player_character_id }) {
    return this.store.findRecord('player-character', player_character_id);
  },

  setupController(controller, model) {
    controller.set('name', model.get('name'));
    this._super(controller, model);
  }

});
