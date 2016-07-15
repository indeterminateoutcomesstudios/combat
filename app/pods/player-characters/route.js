import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('player-character');
  },

  actions: {
    save() {
      let route      = this.router.currentRouteName,
          model      = this.modelFor(route),
          controller = this.controllerFor(route);
      model.set('name', controller.get('name'));
      model.save().then(() => this.transitionTo('player-characters.index'));
    },
    delete(pc) {
      if (!confirm('Are you sure you wish to delete this PC?')) {
        return;
      }
      pc.destroyRecord().then(() => this.transitionTo('player-characters'));
    }
  }

});
