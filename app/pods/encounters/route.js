import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      encounters: this.store.findAll('encounter'),
      pcs: this.store.findAll('player-character')
    });
  },

  actions: {
    async create() {
      let name;
      if (!(name = window.prompt('Name:'))) {
        return;
      }

      let { id } = await this.store.createRecord('encounter', { name }).save()
      this.transitionTo('encounters.details', id);
    },
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
