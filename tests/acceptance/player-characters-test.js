import FactoryGuy, { makeList } from 'ember-data-factory-guy';
import { test } from 'qunit';
import moduleForAcceptance from 'ms-combat/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | player characters');

test('should show player characters', function(assert) {

  FactoryGuy.cacheOnlyMode();
  makeList('player-character', 2);

  visit('/player-characters');

  andThen(() => {
    assert.equal(find('.content li').length, 2);
  });

});

test('should add a new player character', function(assert) {

  FactoryGuy.cacheOnlyMode();
  makeList('player-character', 2);

  visit('/player-characters/new');
  fillIn('#name', 'New Character');
  click('[type=submit]');

  andThen(() => {
    this.store.findAll('player-character').then((pcs) => {
      assert.equal(pcs.get('length'), 3, 'saved the pc');
    });
    assert.equal(find('.content li').length, 3, 'added the pc to the list');
  });

});
