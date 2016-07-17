import Ember from 'ember';
import DataRoute from 'ember-data-route';

export default Ember.Route.extend(DataRoute, {

  model({ monster_id }) {
    return monster_id === 'new' ?
      this.store.createRecord('monster') :
      this.store.findRecord('monster', monster_id);
  },

  resetController() {
    this._super();

    if (this.currentModel.get('isNew')) {
      return;
    }

    // NOTE: At this point, attacks still belong to the `attacks` collection,
    // but are marked as `isDeleted`. This only works if they’re not removed
    // from the collection when deleted.
    this.currentModel.get('attacks').toArray().invoke('rollbackAttributes');
  },

  setupController(controller, model) {
    controller.set('name', model.get('name'));
    this._super(controller, model);
  },

  actions: {
    save() {
      this.currentModel.set('name', this.controller.get('name'));
      // TODO: Some attacks may have been deleted; does not resetting the
      // `attacks` collection to only non-deleted ones cause issues?
      this.currentModel.save()
        .then(() => this.currentModel.get('attacks').invoke('save'))
        .then(() => this.transitionTo('monsters.index'));
    },
    delete(monster) {
      if (!confirm('Are you sure you wish to delete this monster?')) {
        return;
      }
      monster.destroyRecord().then(() => this.transitionTo('monsters'));
    },
    addAttack() {
      this.currentModel.get('attacks')
        .pushObject(this.store.createRecord('attack'));
    }
  }

});
