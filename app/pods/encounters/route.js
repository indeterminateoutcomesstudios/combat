import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      encounters: this.store.findAll('encounter'),
      monsters: this.store.findAll('monster')
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
      encounter.get('monsters').toArray().forEach(m => m.destroyRecord());
      encounter.destroyRecord();
    }
  }

});
