import FactoryGuy from 'ember-data-factory-guy';
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

test('should cancel encounter creation', async function (assert) {

  visit('/encounters/new');
  await click('form.modal a:contains("Cancel")');

  assert.equal(currentURL(), '/encounters', 'transitioned back to the list');

});
