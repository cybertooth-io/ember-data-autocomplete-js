/* eslint-env node */
'use strict';

module.exports = {
  name: require('./package').name,
  included: function (app) {
    this._super.included.apply(this, arguments);
    app.import('node_modules/autocomplete.js/dist/autocomplete.js');
  }
};
