import { test } from 'qunit';
import moduleForAcceptance from 'ms-combat/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | welcome');

test('should show the welcome screen', async function(assert) {

  await visit('/');

  assert.equal(find('.app-welcome').length, 1, 'showed the welcome screen');

});
