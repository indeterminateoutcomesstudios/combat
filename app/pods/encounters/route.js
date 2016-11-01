import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      encounters: this.store.findAll('encounter'),
      pcs: this.store.findAll('player-character')
    });
  },

  actions: {
    didTransition() {
      this.controller.set('showCreateModal', false);
    },
    async create(name) {
      if (!name) { return; }
      this.controller.set('showCreateModal', false);
      let pc = await this.store.createRecord('encounter', { name }).save()
      this.transitionTo('encounters.details', pc.id);
    },
    async delete(encounter) {
      encounter.get('combatants').toArray().invoke('destroyRecord');
      await encounter.destroyRecord();
      this.transitionTo('encounters');
    },
    startCreate() {
      this.controller.set('showCreateModal', true);
      this.controller.set('name', null);
    }
  }

});
