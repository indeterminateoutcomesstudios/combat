import { icon } from 'ms-combat/helpers/icon';
import { module, test } from 'qunit';

module('Unit | Helper | icon');

test('should render the correct svg', function(assert) {
  let result = icon([ 'foo' ]);
  assert.equal(result, `
    <svg class="icon">
      <use xlink:href="assets/icons.svg#foo"></use>
    </svg>
  `);
});
