import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('monster');
  },

  actions: {
    delete(monster) {
      if (!confirm('Are you sure you wish to delete this monster?')) {
        return;
      }
      monster.destroyRecord()
        .then(() => this.transitionTo('monsters'));
    }
  }

});
