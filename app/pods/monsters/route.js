import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('monster');
  },

  actions: {
    save() {
      let route      = this.router.currentRouteName,
          model      = this.modelFor(route),
          controller = this.controllerFor(route);
      model.set('name', controller.get('name'));
      model.save().then(() => this.transitionTo('monsters.index'));
    },
    delete(monster) {
      if (!confirm('Are you sure you wish to delete this monster?')) {
        return;
      }
      monster.destroyRecord()
        .then(() => this.transitionTo('monsters'));
    }
  }

});
