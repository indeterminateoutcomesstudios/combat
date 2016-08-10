import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('encounter', {

  default: {},

  traits: {
    with_combatants: {
      combatants: FactoryGuy.hasMany('combatant', 3)
    }
  }

});
