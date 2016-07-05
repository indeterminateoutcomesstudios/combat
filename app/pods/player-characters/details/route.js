import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {

  model({ player_character_id }) {
    return this.store.findRecord('player-character', player_character_id);
  },

  actions: {
    save() {
      this.currentModel.save()
        .then(() => this.transitionTo('player-characters.index'));
    }
  }

});
