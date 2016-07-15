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
      // TODO: Some attacks may have been deleted; does not resetting the
      // `attacks` collection to only non-deleted ones cause issues?
      model.save()
        .then(() => model.get('attacks').forEach(a => a.save()))
        .then(() => this.transitionTo('monsters.index'));
    },
    delete(monster) {
      if (!confirm('Are you sure you wish to delete this monster?')) {
        return;
      }
      monster.destroyRecord().then(() => this.transitionTo('monsters'));
    },
    addAttack() {
      let route = this.router.currentRouteName,
          model = this.modelFor(route);
      model.get('attacks').pushObject(this.store.createRecord('attack'));
    }
  }

});
