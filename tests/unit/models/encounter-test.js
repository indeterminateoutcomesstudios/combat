import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('encounter', 'Unit | Model | encounter', {
  needs: [ 'model:combatant', 'model:attack' ]
});

test('should arrange combatants', function(assert) {
  let model = this.subject();
  Ember.run(() => {
    model.get('combatants').createRecord({
      name: 'Second',
      initiative: '8'
    });
    model.get('combatants').createRecord({
      name: 'Third',
      initiative: '20',
      currentHitPoints: 0
    });
    model.get('combatants').createRecord({
      name: 'First',
      initiative: '18'
    });
  });
  let combatants = model.get('arrangedCombatants').mapBy('name');
  assert.deepEqual(combatants, [ 'First', 'Second', 'Third' ]);
});
