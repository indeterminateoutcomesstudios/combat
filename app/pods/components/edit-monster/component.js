import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    deleteAttack(attack) {
      // NOTE: We’re not removing the attack from the model in case we need to
      // rollback this relationship. Otherwise, the attack would disappear from
      // the `attacks` array.
      attack.deleteRecord();
    }
  }

})
