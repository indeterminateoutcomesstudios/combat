import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('combatant', 'Unit | Model | combatant', {
  needs: [ 'model:attack', 'model:encounter' ]
});

test("should indicate all's well", function(assert) {
  let model = this.subject();
  Ember.run(() => model.setProperties({
    hitPoints: 42,
    currentHitPoints: 42
  }));
  assert.equal(model.get('bloodied'), false);
});

test('should indicate "bloodied"', function(assert) {
  let model = this.subject();
  Ember.run(() => model.setProperties({
    hitPoints: 42,
    currentHitPoints: 21
  }));
  assert.equal(model.get('bloodied'), true);
});

test('should indicate "unconscious"', function(assert) {
  let model = this.subject();
  Ember.run(() => model.setProperties({
    hitPoints: 42,
    currentHitPoints: 0
  }));
  assert.equal(model.get('unconscious'), true);
  assert.equal(model.get('bloodied'), false);
});
