import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('encounter', 'Unit | Model | encounter', {
  needs: [ 'model:combatant', 'model:attack', 'model:monster' ]
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

test('should add a combatant', async function(assert) {

  let store = this.container.lookup('service:store');
  let encounter = this.subject();

  let combatant, addedCombatant;
  await Ember.run(async () => {
    combatant = store.createRecord('combatant', {
      hitPoints: 42
    });
    addedCombatant = await encounter.addCombatant(combatant, 'Test Combatant');
  });

  assert.equal(encounter.get('combatants.length'), 1, 'added the combatant');
  assert.equal(addedCombatant.get('name'), 'Test Combatant', 'used the provided name');
  assert.equal(addedCombatant.get('currentHitPoints'), 42, 'sets current hit points');

  // TODO: Figure out how to add attacks without a `hasOwnProperty` error.
  // assert.equal(addedCombatant.get('attacks.length'), 0, 'adds attacks from the combatant');

});
