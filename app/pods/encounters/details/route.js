import Ember from 'ember';

export default Ember.Route.extend({

  model({ encounter_id }) {
    return this.store.findRecord('encounter', encounter_id);
  },

  actions: {
    addMonster(monster) {
      let encounter = this.currentModel,
          monsters = encounter.get('monsters'),
          name = this._generateName(monster.get('name')),
          encMonster = this.store.createRecord('encounter-monster', {
            ...monster.toJSON(), name, currentHitPoints: monster.get('hitPoints')
          });
          
      monsters.pushObject(encMonster);
      encMonster.save().then(() => encounter.save());
    },
    saveMonster(monster) {
      monster.save();
    },
    delete(encMonster) {
      let encounter = this.currentModel;
      encounter.get('monsters').removeObject(encMonster);
      encounter.save().then(() => encMonster.destroyRecord());
    }
  },

  _generateName(newMonsterName) {
    let monsterNames = this.currentModel.get('monsters').mapBy('name'),
        currentMonsters = monsterNames.filter(n => n.indexOf(newMonsterName) === 0);
    return newMonsterName + ' #' + (currentMonsters.length + 1);
  }

});
