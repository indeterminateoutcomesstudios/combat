import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-combatants', 'Integration | Component | list combatants', {
  integration: true
});

test('it renders', function(assert) {

  this.on('delete', Ember.K);
  this.on('update', Ember.K);
  this.on('setTurn', Ember.K);
  this.set('model', [ {}, {}, {}, {} ]);
  this.render(hbs`
    {{list-combatants combatants=model
      onDelete=(action 'delete')
      onUpdate=(action 'update')
      onSetTurn=(action 'setTurn')
    }}`);

  assert.equal(this.$('tbody tr').length, 4, 'shows combatants');

});
