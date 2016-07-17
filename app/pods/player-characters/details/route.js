import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {

  model({ player_character_id }) {
    return player_character_id === 'new' ?
      this.store.createRecord('player-character') :
      this.store.findRecord('player-character', player_character_id);
  },

  setupController(controller, model) {
    controller.set('name', model.get('name'));
    this._super(controller, model);
  },

  actions: {
    async save() {
      this.currentModel.set('name', this.controller.get('name'));
      await this.currentModel.save();
      this.transitionTo('player-characters.index');
    },
    async delete(pc) {
      if (!confirm('Are you sure you wish to delete this PC?')) {
        return;
      }
      await pc.destroyRecord();
      this.transitionTo('player-characters');
    }
  }

});
