import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {

  model({ monster_id }) {
    return this.store.findRecord('monster', monster_id);
  },

  actions: {
    save() {
      this.currentModel.save()
        .then(() => this.transitionTo('monsters.index'));
    }
  }

});
