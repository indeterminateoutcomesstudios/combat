import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('monster');
  },

  actions: {
    delete(monster) {
      monster.destroyRecord();
    }
  }

});
