import Ember from 'ember';

export default Ember.Route.extend({

  model({ encounter_id }) {
    return Ember.RSVP.hash({
      encounter: this.store.findRecord('encounter', encounter_id),
      playerCharacters: this.store.findAll('player-character')
    });
  },

  actions: {
    addMonster(combatant) {
      let { encounter } = this.currentModel,
          combatants = encounter.get('combatants'),
          name = this._generateName(combatant.get('name')),
          encMonster = this.store.createRecord('combatant', {
            ...combatant.toJSON(), name, currentHitPoints: combatant.get('hitPoints')
          });

      combatants.pushObject(encMonster);
      encMonster.save().then(() => encounter.save());
    },
    saveParticipant(combatant) {
      combatant.save();
    },
    deleteParticipant(combatant) {
      if (!confirm('Are you sure you wish to delete this combatant?')) {
        return;
      }
      let { encounter } = this.currentModel;
      encounter.get('combatants').removeObject(combatant);
      encounter.save().then(() => combatant.destroyRecord());
    }
  },

  _generateName(newMonsterName) {
    let { encounter } = this.currentModel,
        monsterNames = encounter.get('combatants').mapBy('name'),
        currentCombatants = monsterNames.filter(n => n.indexOf(newMonsterName) === 0);
    return newMonsterName + ' #' + (currentCombatants.length + 1);
  }

});
