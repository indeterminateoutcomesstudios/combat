import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({

  name: attr(),
  combatants: hasMany('combatant'),

  arrangedCombatants: Ember.computed(
    'combatants.@each.unconscious',
    'combatants.@each.initiative', function() {
      return [
        ...this.get('combatants').rejectBy('unconscious').sort((a, b) =>
          +b.get('initiative') - +a.get('initiative')),
        ...this.get('combatants').filterBy('unconscious')
      ];
    })

});
