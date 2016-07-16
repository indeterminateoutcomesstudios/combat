import Ember from 'ember';

export function formatModifier(params) {
  let modifier = +params[0];
  if (params[0] == null || isNaN(modifier)) {
    return 'n/a';
  } else if (modifier >= 0) {
    return '+' + modifier;
  } else {
    return '–' + Math.abs(modifier);
  }
}

export default Ember.Helper.helper(formatModifier);
