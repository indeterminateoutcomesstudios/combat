import Monster from './monster';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Monster.extend({
  encounter:        belongsTo('encounter'),
  currentHitPoints: attr('number'),
  initiative:       attr('number')
});
