/* eslint-env node */

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      plugins: [
        'transform-object-rest-spread',
      ],
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    svgstore: {
      excludeSourceFiles: true,
      files: {
        sourceDirs: [ 'public/icons' ],
        outputFile: '/assets/icons.svg',
      }
    }
  });

  return app.toTree();
};
