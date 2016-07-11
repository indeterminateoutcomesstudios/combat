import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('player-character');
  },

  actions: {
    delete(pc) {
      if (!confirm('Are you sure you wish to delete this PC?')) {
        return;
      }
      pc.destroyRecord().then(() => this.transitionTo('player-characters'));
    }
  }

});
