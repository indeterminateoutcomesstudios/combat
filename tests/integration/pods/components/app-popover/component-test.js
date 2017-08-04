import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-popover', 'Integration | Component | app popover', {
  integration: true
});

test('should render', function(assert) {

  this.render(hbs`{{app-popover}}`);

  assert.equal(this.$('.popover-backdrop').length, 1, 'shows the backdrop');
  assert.equal(this.$('.popover-content').length, 1, 'shows the popover content');
  assert.notOk(this.$('.app-popover').hasClass('shown'), 'hides the popover by default');

});

test('should render when shown', function(assert) {

  this.render(hbs`{{app-popover shown=true}}`);

  assert.ok(this.$('.app-popover').hasClass('shown'), 'shows the popover');

});

test('should render items', function(assert) {

  this.set('items', [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' }
  ]);
  this.on('select', () => null);

  this.render(hbs`{{app-popover items=items onSelect=(action 'select')}}`);

  let items = this.$().find('.popover-item');
  assert.equal(items.length, 3, 'shows items');
  assert.equal(items.text(), `Item 1Item 2Item 3`, 'renders items');

});

test('should select an item', function(assert) {

  let selectedItem;
  this.set('items', [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' }
  ]);
  this.on('select', item => selectedItem = item);

  this.render(hbs`{{app-popover items=items onSelect=(action 'select')}}`);
  this.$().find('.popover-item:contains("Item 1")').click();

  assert.equal(selectedItem.name, 'Item 1');

});
