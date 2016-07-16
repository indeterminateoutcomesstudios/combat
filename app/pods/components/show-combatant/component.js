import Ember from 'ember';

export default Ember.Component.extend({

  tagName: '',

  actions: {
    commitIfEnter(val, e) {
      if (e.keyCode === 13) {
        e.currentTarget.blur(); // This triggers an update.
      }
    }
  }

});
