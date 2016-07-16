import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      encounters: this.store.findAll('encounter'),
      pcs: this.store.findAll('player-character')
    });
  },

  actions: {
    create() {
      let name;
      if (!(name = window.prompt('Name:'))) {
        return;
      }

      this.store.createRecord('encounter', { name }).save()
        .then(({ id }) => this.transitionTo('encounters.details', id));
    },
    delete(encounter) {
      if (!confirm('Are you sure you wish to delete this encounter?')) {
        return;
      }
      encounter.get('combatants').toArray().invoke('destroyRecord');
      encounter.destroyRecord().then(() => this.transitionTo('encounters'));
    }
  }

});
