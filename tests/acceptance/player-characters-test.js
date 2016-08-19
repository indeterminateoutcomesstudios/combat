import FactoryGuy, { make, makeList } from 'ember-data-factory-guy';
import { test } from 'qunit';
import moduleForAcceptance from 'ms-combat/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | player characters');

test('should show player characters', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  makeList('player-character', 2);

  await visit('/player-characters');

  assert.equal(find('.content li').length, 2);

});

test('should add a new player character', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  makeList('player-character', 2);

  visit('/player-characters/new');
  fillIn('#name', 'New Character');
  await click('[type=submit]');

  let pcs = await this.store.findAll('player-character');
  let newPC = pcs.objectAt(2);
  assert.equal(pcs.get('length'), 3, 'saved the pc');
  assert.equal(find('.content li').length, 3, 'added the pc to the list');
  assert.equal(currentURL(), `/player-characters/${newPC.get('id')}`, 'redirected to the new pc');

});

test('should confirm when deleting a pc', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let pc = make('player-character');

  visit(`/player-characters/${pc.get('id')}`);
  await click('button:contains("Delete")');

  assert.equal(find('.app-dialog.shown').length, 1, 'showed the "are you sure?" modal');

});

test('should delete a pc', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let pcs = makeList('player-character', 2);
  let pc = pcs.objectAt(0);

  visit(`/player-characters/${pc.get('id')}`);
  click('button:contains("Delete")');
  await click('form.modal button:contains("Yes")');

  let savedPCs = await this.store.findAll('player-character');
  assert.equal(savedPCs.get('length'), 1, 'deleted the pc');
  assert.equal(currentURL(), '/player-characters', 'transitioned back to the list');

});

test('should dismiss the "are you sure?" modal when canceling', async function(assert) {

  FactoryGuy.cacheOnlyMode();
  let pc = make('player-character');

  visit(`/player-characters/${pc.get('id')}`);
  click('button:contains("Delete")');
  await click('form.modal button:contains("No")');

  assert.equal(find('.app-dialog.shown').length, 0, 'dismissed the "are you sure?" modal');

});
