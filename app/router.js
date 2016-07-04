import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('monsters', function() {
    this.route('new');
    this.route('details', { path: ':monster_id' });
  });
  this.route('encounters', function() {
    this.route('details', { path: ':encounter_id' });
  });
});

export default Router;
