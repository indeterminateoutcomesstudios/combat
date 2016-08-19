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

  let monsters = await this.store.findAll('monster');
  let newMonster = monsters.objectAt(2);
  assert.equal(monsters.get('length'), 3, 'saved the monster');
  assert.equal(find('.content li').length, 3, 'added the monster to the list');
  assert.equal(currentURL(), `/monsters/${newMonster.get('id')}`, 'redirected to the new monster');

});

test('should add attacks to a monster', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let monster = make('monster');

  visit(`/monsters/${monster.get('id')}`);
  await click('#attacks_add');

  assert.equal(find('#attacks tbody tr').length, 1, 'added the attack');

});

test('should confirm when deleting a monster', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let monster = make('monster');

  visit(`/monsters/${monster.get('id')}`);
  await click('button:contains("Delete")');

  assert.equal(find('.app-dialog.shown').length, 1, 'showed the "are you sure?" modal');

});

test('should delete a monster', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let monsters = makeList('monster', 2);
  let monster = monsters.objectAt(0);

  visit(`/monsters/${monster.get('id')}`);
  click('button:contains("Delete")');
  await click('form.modal button:contains("Yes")');

  let savedMonsters = await this.store.findAll('monster');
  assert.equal(savedMonsters.get('length'), 1, 'deleted the monster');
  assert.equal(currentURL(), '/monsters', 'transitioned back to the list');

});

test('should dismiss the "are you sure?" modal when canceling', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let monster = make('monster');

  visit(`/monsters/${monster.get('id')}`);
  click('button:contains("Delete")');
  await click('form.modal button:contains("No")');

  assert.equal(find('.app-dialog.shown').length, 0, 'dismissed the "are you sure?" modal');

});
