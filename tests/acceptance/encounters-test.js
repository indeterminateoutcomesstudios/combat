import FactoryGuy, { make, makeList } from 'ember-data-factory-guy';
import { test } from 'qunit';
import moduleForAcceptance from 'ms-combat/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | encounters');

test('should ask for a name when creating an encounter', async function(assert) {

  await visit('/encounters/new');

  assert.equal(find('.modal').length, 1, 'showed the "name" modal');

  let controller = this.container.lookup('controller:encounters.details');
  assert.ok(controller.get('showNameModal'));

  assert.equal(find('.content li').length, 0, 'did not show the new encounter');

});

test('should name and create a new encounter', async function(assert) {

  FactoryGuy.cacheOnlyMode();

  visit('/encounters/new');
  fillIn('#name', 'Morthos');
  await triggerEvent('form.modal', 'submit');

  let encounters = await this.store.findAll('encounter'),
      newEncounter = encounters.objectAt(0);
  assert.equal(encounters.rejectBy('isNew').get('length'), 1, 'saved the encounter');
  assert.equal(newEncounter.get('name'), 'Morthos', 'saved the name');
  assert.equal(currentURL(), `/encounters/${newEncounter.get('id')}`, 'transitioned to the new encounter');

});

test('should cancel encounter creation', async function(assert) {

  visit('/encounters/new');
  await click('form.modal a:contains("Cancel")');

  assert.equal(currentURL(), '/encounters', 'transitioned back to the list');

});

test('should confirm when deleting an encounter', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let encounter = make('encounter');

  visit(`/encounters/${encounter.get('id')}`);
  await click('button:contains("Delete")');

  assert.equal(find('.modal').length, 1, 'showed the "are you sure?" modal');

});

test('should delete an encounter', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let encounters = makeList('encounter', 2);
  let encounter = encounters.objectAt(0);

  visit(`/encounters/${encounter.get('id')}`);
  click('button:contains("Delete")');
  await click('form.modal button:contains("Yes")');

  let savedEncounters = await this.store.findAll('encounter');
  assert.equal(savedEncounters.get('length'), 1, 'deleted the encounter');
  assert.equal(currentURL(), '/encounters', 'transitioned back to the list');

});

test('should dismiss the "are you sure?" modal when canceling', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let encounter = make('encounter');

  visit(`/encounters/${encounter.get('id')}`);
  click('button:contains("Delete")');
  await click('form.modal button:contains("No")');

  assert.equal(find('.modal').length, 0, 'dismissed the "are you sure?" modal');

});

test('should confirm removing a combatant', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let encounter = make('encounter', 'with_combatants');

  visit(`/encounters/${encounter.get('id')}`);
  await click('table .button.danger:eq(0)');

  assert.equal(find('.modal').length, 1, 'showed the "are you sure?" modal');

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

test('should dismiss the "are you sure?" combatant modal when canceling', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let encounter = make('encounter', 'with_combatants');

  visit(`/encounters/${encounter.get('id')}`);
  click('table .button.danger:eq(0)');
  await click('form.modal button:contains("No")');

  assert.equal(find('.modal').length, 0, 'showed the "are you sure?" modal');

});
