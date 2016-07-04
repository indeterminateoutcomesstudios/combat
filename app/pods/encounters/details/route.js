import Ember from 'ember';

export default Ember.Route.extend({

  model({ encounter_id }) {
    return Ember.RSVP.hash({
      encounter: this.store.findRecord('encounter', encounter_id),
      monsters: this.store.findAll('monster')
    });
  }

});
