import Ember from 'ember';

export default Ember.Route.extend({

  model({ encounter_id }) {
    return Ember.RSVP.hash({
      encounter: this.store.findRecord('encounter', encounter_id),
      monsters: this.store.findAll('monster')
    });
  },

  actions: {
    addMonster(monster) {
      let { encounter } = this.currentModel,
          encMonster = this.store.createRecord('encounter-monster', {
            name: 'Sample',
            monster
          });
      encounter.get('monsters').pushObject(encMonster);
      encMonster.save().then(() => encounter.save());
    },
    delete(encMonster) {
      let { encounter } = this.currentModel;
      encounter.get('monsters').removeObject(encMonster);
      encounter.save().then(() => encMonster.destroyRecord());
    }
  }

});
