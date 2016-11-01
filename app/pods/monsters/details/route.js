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
    model.set('rename', model.get('name'));
    controller.setProperties({
      isNew: model.get('isNew'), // `model.isNew` is reset before the transition
      showDeleteConfirmationModal: false
    });
    this._super(controller, model);
  },

  actions: {
    async save() {
      this.currentModel.set('name', this.currentModel.get('rename'));
      // TODO: Some attacks may have been deleted; does not resetting the
      // `attacks` collection to only non-deleted ones cause issues?
      await this.currentModel.save()
      this.currentModel.get('attacks').invoke('save')
      this.transitionTo('monsters.details', this.currentModel.get('id'));
    },
    async delete(monster) {
      await monster.destroyRecord();
      this.transitionTo('monsters');
    },
    addAttack() {
      this.currentModel.get('attacks')
        .pushObject(this.store.createRecord('attack'));
    }
  }

});
