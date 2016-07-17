import Ember from 'ember';
import FactoryGuy, { makeList } from 'ember-data-factory-guy';
import { test } from 'qunit';
import moduleForAcceptance from 'ms-combat/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | player characters', {

  afterEach() {
    this.store = this.application.__container__.lookup('service:store');
    Ember.run(() => {
      this.store.unloadAll();
      window.localStorage.clear();
    });
  }

});

test('visiting /player-characters', function(assert) {

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
    assert.equal(find('.content li').length, 3);
  });

});
