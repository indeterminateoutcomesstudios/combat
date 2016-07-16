import { formatModifier } from 'ms-combat/helpers/format-modifier';
import { module, test } from 'qunit';

module('Unit | Helper | format modifier');

test('should format a positive number', (assert) => {
  let result = formatModifier([ 2 ]);
  assert.equal(result, '+2');
});

test('should format a negative number', (assert) => {
  let result = formatModifier([ -2 ]);
  assert.equal(result, '–2');
});

test('should format zero', (assert) => {
  let result = formatModifier([ 0 ]);
  assert.equal(result, '+0');
});

test('should format nothing', (assert) => {
  let result = formatModifier([ null ]);
  assert.equal(result, 'n/a');
});

test('should format gobbledygook', (assert) => {
  let result = formatModifier([ 'gobbledygook' ]);
  assert.equal(result, 'n/a');
});
