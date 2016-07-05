import Ember from 'ember';

export default Ember.Controller.extend({

  // TODO: Using a sort expression sorts numbers alphabetically, but sorting
  // things this way doesn't trigger re-sorts. Fix this!
  monstersByInit: Ember.computed.sort('model.encounter.monsters', (a, b) =>
    +b.get('initiative') - +a.get('initiative')),

  participants: function() {
    return Ember.A([
      ...this.get('model.encounter.monsters').map(m => {
        m.set('template', 'show-encounter-monster');
        return m;
      }),
      ...this.get('model.playerCharacters').map(pc => {
        pc.set('template', 'show-player-character');
        return pc;
      })
    ]).sort((a, b) => +b.get('initiative') - +a.get('initiative'));
  }.property('model.encounter.monsters.@each.initiative', 'model.playerCharacters.@each.initiative')

});
