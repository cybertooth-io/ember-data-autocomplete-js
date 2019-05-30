'use strict';

module.exports = {
  afterInstall(/*options*/) {
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-auto-import' },
        { name: 'ember-data' },
        { name: 'ember-data-storefront' }
      ]
    }).then(() => {
      return this.addPackagesToProject([{
        name: 'autocomplete.js',
        version: '^0.36.0'
      }])
    });
  },

  description: 'Ember Data driven autocomplete.js text input.',

  name: 'ember-data-autocomplete-js',

  /**
   * no-op since we're just adding dependencies
   */
  normalizeEntityName() {
  }
};
