import Ember from 'ember';

export default Ember.Route.extend({

  model({ encounter_id }) {
    return Ember.RSVP.hash({
      encounter: this.store.findRecord('encounter', encounter_id),
      playerCharacters: this.store.findAll('player-character'),
      monsters: this.store.findAll('monster')
    });
  },

  actions: {
    async addPC(pc) {
      let { encounter } = this.currentModel;
      await encounter.addCombatant(pc, pc.get('name')).save();
      await encounter.save();
    },
    async addMonster(monster) {
      let { encounter } = this.currentModel,
          name = this._generateName(monster.get('name'));
      await encounter.addCombatant(monster, name).save();
      await encounter.save();
    },
    setTurn(combatant) {
      let { encounter } = this.currentModel,
          combatants = encounter.get('combatants');
      combatants.without(combatant).setEach('turn', false);
      combatant.set('turn', !combatant.get('turn'));
      combatants.invoke('save');
    },
    saveParticipant(combatant) {
      combatant.save();
    },
    async deleteParticipant(combatant) {
      if (!confirm('Are you sure you wish to delete this combatant?')) {
        return;
      }
      let { encounter } = this.currentModel;
      encounter.get('combatants').removeObject(combatant);
      await encounter.save()
      combatant.destroyRecord();
    }
  },

  _generateName(newMonsterName) {
    let { encounter } = this.currentModel,
        monsterNames = encounter.get('combatants').mapBy('name'),
        currentCombatants = monsterNames
          .filter(name => name.indexOf(newMonsterName) === 0);
    return newMonsterName + ' #' + (currentCombatants.length + 1);
  }

});
