import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      encounters: this.store.findAll('encounter'),
      pcs: this.store.findAll('player-character'),
      monsters: this.store.findAll('monster')
    });
  },

  actions: {
    create() {
      let name;
      if (!(name = window.prompt('Name:'))) {
        return;
      }

      let combatants = this.currentModel.pcs.map(pc => {
        let mappedPc = this.store.createRecord('combatant', pc.toJSON());
        mappedPc.set('currentHitPoints', mappedPc.get('hitPoints'));
        mappedPc.save();
        return mappedPc;
      });

      this.store.createRecord('encounter', { name, combatants }).save()
        .then(({ id }) => this.transitionTo('encounters.details', id));
    },
    delete(encounter) {
      if (!confirm('Are you sure you wish to delete this encounter?')) {
        return;
      }
      encounter.get('combatants').toArray().forEach(m => m.destroyRecord());
      encounter.destroyRecord().then(() => this.transitionTo('encounters'));
    }
  }

});
