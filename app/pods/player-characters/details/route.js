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
    save() {
      this.currentModel.set('name', this.controller.get('name'));
      this.currentModel.save().then(() => this.transitionTo('player-characters.index'));
    },
    delete(pc) {
      if (!confirm('Are you sure you wish to delete this PC?')) {
        return;
      }
      pc.destroyRecord().then(() => this.transitionTo('player-characters'));
    }
  }

});
