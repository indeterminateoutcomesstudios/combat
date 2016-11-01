import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {

  model({ player_character_id }) {
    return this.store.findRecord('player-character', player_character_id);
  },

  setupController(controller, model) {
    model.set('rename', model.get('name'));
    controller.setProperties({
      showDeleteConfirmationModal: false
    });
    this._super(controller, model);
  },

  actions: {
    async save() {
      this.currentModel.set('name', this.currentModel.get('rename'));
      await this.currentModel.save();
      this.transitionTo('player-characters.details', this.currentModel.get('id'));
    },
    async delete(pc) {
      this.controller.set('showDeleteConfirmationModal', false);
      await pc.destroyRecord();
      this.transitionTo('player-characters');
    }
  }

});
