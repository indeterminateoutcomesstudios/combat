import Ember from 'ember';
import Monster from './monster';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Monster.extend({

  encounter:        belongsTo('encounter'),
  turn:             attr('boolean'),
  currentHitPoints: attr('number'),
  initiative:       attr('number'),

  bloodied: Ember.computed('hitPoints', 'currentHitPoints', function() {
    let hp = this.get('hitPoints'),
        currentHP = this.get('currentHitPoints');
    return currentHP > 0 && currentHP <= Math.floor(hp / 2);
  }),

  unconscious: Ember.computed('currentHitPoints', function() {
    let currentHP = this.get('currentHitPoints');
    return currentHP <= 0;
  })

});
