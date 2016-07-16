import Ember from 'ember';

export default Ember.Component.extend({

  tagName: '',

  actions: {
    update() {
      this.attrs.onUpdate();
    },
    destroy() {
      this.attrs.onDelete();
    }
  }

});
