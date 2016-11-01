import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('player-characters', function() {
    this.route('details', { path: ':player_character_id' });
    this.route('new');
  });
  this.route('monsters', function() {
    this.route('details', { path: ':monster_id' });
    this.route('new');
  });
  this.route('encounters', function() {
    this.route('details', { path: ':encounter_id' });
    this.route('new');
  });
});

export default Router;
