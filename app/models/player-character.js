import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name:             attr('string'),
  hitPoints:        attr('number'),
  currentHitPoints: attr('number'),
  armorClass:       attr('number'),
  initiative:       attr('number'),
  notes:            attr('string')
});
