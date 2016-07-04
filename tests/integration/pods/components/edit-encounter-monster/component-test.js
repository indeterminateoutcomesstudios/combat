import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-encounter-monster', 'Integration | Component | edit encounter monster', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-encounter-monster}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#edit-encounter-monster}}
      template block text
    {{/edit-encounter-monster}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
