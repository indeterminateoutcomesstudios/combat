import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name:             attr('string'),
  hitPoints:        attr('number'),
  armorClass:       attr('number'),
  notes:            attr('string')
});
