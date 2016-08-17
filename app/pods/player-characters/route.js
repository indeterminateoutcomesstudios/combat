import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('player-character');
  },

  actions: {
    delete(pc) {
      pc.destroyRecord();
    }
  }

});
