import Ember from 'ember';

export default Ember.Controller.extend({

  // TODO: Using a sort expression sorts numbers alphabetically, but sorting
  // things this way doesn't trigger re-sorts. Fix this!
  monstersByInit: Ember.computed.sort('model.monsters', (a, b) =>
    +b.get('initiative') - +a.get('initiative'))

});
