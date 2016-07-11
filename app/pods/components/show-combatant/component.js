import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'tr',
  classNames: 'form inline',

  actions: {
    update() {
      this.attrs.onUpdate();
    },
    destroy() {
      this.attrs.onDelete();
    }
  }

});
