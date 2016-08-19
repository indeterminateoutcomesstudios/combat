import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-dialog', 'Integration | Component | app dialog', {
  integration: true
});

test('should render', function(assert) {

  this.render(hbs`{{app-dialog}}`);

  assert.equal(this.$('.dialog-backdrop').length, 1, 'shows the backdrop');
  assert.equal(this.$('.dialog-content').length, 1, 'shows the dialog content');
  assert.notOk(this.$('.app-dialog').hasClass('shown'), 'hides the dialog by default');

});

test('should render when shown', function(assert) {

  this.render(hbs`{{app-dialog shown=true}}`);

  assert.ok(this.$('.app-dialog').hasClass('shown'), 'shows the dialog');

});

test('should render when fixed', function(assert) {

  this.render(hbs`{{app-dialog fixed=true}}`);

  assert.ok(this.$('.app-dialog').hasClass('fixed'), 'shows the fixed dialog');

});
