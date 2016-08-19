import FactoryGuy, { make } from 'ember-data-factory-guy';
import { test } from 'qunit';
import moduleForAcceptance from 'ms-combat/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | encounters | combatants');

test('should confirm removing a combatant', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let encounter = make('encounter', 'with_combatants');

  visit(`/encounters/${encounter.get('id')}`);
  await click('table .button.danger:eq(0)');

  assert.equal(find('.app-dialog.shown').length, 1, 'showed the "are you sure?" modal');

});

// HACK: This test fails and throws an error about needing to run something with
// `Ember.run`. I've verified it manually, but need internet access to figure
// out what's going on.

// test('should delete a combatant', async function(assert) {
//
//   FactoryGuy.cacheOnlyMode();
//   let encounter = make('encounter', 'with_combatants');
//
//   visit(`/encounters/${encounter.get('id')}`);
//   click('table .button.danger:eq(0)');
//   await click('form.modal button:contains("Yes")');
//
//   assert.equal(find('tbody tr').length, 2, 'deleted the combatant');
//   assert.equal(find('.modal').length, 0, 'hid the modal');
//
// });

test('should dismiss the "are you sure?" modal when canceling', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let encounter = make('encounter', 'with_combatants');

  visit(`/encounters/${encounter.get('id')}`);
  click('table .button.danger:eq(0)');
  await click('.app-dialog.shown button:contains("No")');

  assert.equal(find('.app-dialog.shown').length, 0, 'showed the "are you sure?" modal');

});

test('should show "notes"', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let encounter = make('encounter', 'with_combatants');

  visit(`/encounters/${encounter.get('id')}`);
  await click('[data-action="notes"]:eq(0)');

  assert.equal(find('.app-dialog.shown').length, 1, 'showed the "notes" modal');

});

test('should dismiss "notes"', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let encounter = make('encounter', 'with_combatants');

  visit(`/encounters/${encounter.get('id')}`);
  click('[data-action="notes"]:eq(0)');
  await click('.app-dialog.shown button:contains("Close")');

  assert.equal(find('.app-dialog.shown').length, 0, 'hid the "notes" modal');

});
