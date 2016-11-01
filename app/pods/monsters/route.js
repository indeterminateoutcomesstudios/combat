import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('monster');
  },

  actions: {
    async create(name) {
      if (!name) { return; }
      this.controller.set('showCreateModal', false);
      let pc = await this.store.createRecord('monster', { name }).save()
      this.transitionTo('monsters.details', pc.id);
    },
    startCreate() {
      this.controller.set('showCreateModal', true);
      this.controller.set('name', null);
    },
    cancelCreate() {
      this.controller.set('showCreateModal', false);
      this.transitionTo('monsters');
    }
  }

});
