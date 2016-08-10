import Ember from 'ember';

export default Ember.Route.extend({

  model({ encounter_id }) {
    let getEncounter = encounter_id === 'new' ?
      this.store.createRecord.bind(this.store, 'encounter') :
      this.store.findRecord.bind(this.store, 'encounter', encounter_id);
    return Ember.RSVP.hash({
      encounter: getEncounter(),
      playerCharacters: this.store.findAll('player-character'),
      monsters: this.store.findAll('monster')
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      name: '',
      showNameModal: model.encounter.get('isNew')
    });
  },

  actions: {
    async create() {
      let { encounter } = this.currentModel;
      encounter.set('name', this.controller.get('name'));
      await encounter.save();
      this.transitionTo('encounters.details', encounter.get('id'));
    },
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
