import FactoryGuy, { make, makeList } from 'ember-data-factory-guy';
import { test } from 'qunit';
import moduleForAcceptance from 'ms-combat/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | monsters');

test('should show monsters', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  makeList('monster', 2);

  await visit('/monsters');

  assert.equal(find('.content li').length, 2, 'showed a list of monsters');

});

test('should add a new monster', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  makeList('monster', 2);

  visit('/monsters/new');
  fillIn('#name', 'New Monster');
  await click('[type=submit]');

  let pcs = await this.store.findAll('monster');
  assert.equal(pcs.get('length'), 3, 'saved the monster');
  assert.equal(find('.content li').length, 3, 'added the monster to the list');

});

test('should add attacks to a monster', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let monster = make('monster');

  visit(`/monsters/${monster.get('id')}`);
  await click('#attacks_add');

  assert.equal(find('#attacks tbody tr').length, 1, 'added the attack');

});
