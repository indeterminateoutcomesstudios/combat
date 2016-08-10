import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      encounters: this.store.findAll('encounter'),
      pcs: this.store.findAll('player-character')
    });
  },

  actions: {
    async delete(encounter) {
      if (!confirm('Are you sure you wish to delete this encounter?')) {
        return;
      }
      encounter.get('combatants').toArray().invoke('destroyRecord');
      await encounter.destroyRecord();
      this.transitionTo('encounters');
    }
  }

});
