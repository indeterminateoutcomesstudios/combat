import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {

  model() {
    return this.store.createRecord('player-character');
  },

  actions: {
    save() {
      this.currentModel.save()
        .then(() => this.transitionTo('player-characters.index'));
    }
  }

});
