import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-combatants', 'Integration | Component | list combatants', {
  integration: true
});

test('it renders', function(assert) {

  this.on('no-op', () => null);
  this.set('model', [ {}, {}, {}, {} ]);
  this.render(hbs`
    {{list-combatants combatants=model
      onDelete=(action 'no-op')
      onUpdate=(action 'no-op')
      onSetTurn=(action 'no-op')
      onShowNotes=(action 'no-op')
    }}`);

  assert.equal(this.$('tbody tr').length, 4, 'shows combatants');

});
