import Ember from 'ember';

export default Ember.Component.extend({

  classNameBindings: [ ':banner', 'isElectron:electron:browser' ],

  isElectron: Ember.computed(function() {
    return window.ELECTRON;
  })

});
