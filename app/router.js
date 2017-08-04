import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('monsters', function() {
    this.route('details', { path: ':monster_id' });
  });
  this.route('encounters', function() {
    this.route('details', { path: ':encounter_id' });
  });
  this.route('player-characters', function() {
    this.route('details', { path: ':player_character_id' });
  });
});

export default Router;
