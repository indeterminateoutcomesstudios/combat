import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('encounter');
  },

  actions: {
    create() {
      let name;
      if (!(name = window.prompt('Name:'))) {
        return;
      }

      this.store.createRecord('encounter', { name }).save()
        .then(e => this.transitionTo('encounters.details', e));
    }
  }

});
