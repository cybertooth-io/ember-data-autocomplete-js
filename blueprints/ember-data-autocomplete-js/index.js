"use strict";

module.exports = {
  afterInstall(/*options*/) {
    return this.addAddonsToProject({
      packages: [],
    }).then(() => {
      return this.addPackagesToProject([]);
    });
  },

  description: "Ember Data driven autocomplete.js text input.",

  name: "ember-data-autocomplete-js",

  /**
   * no-op since we're just adding dependencies
   */
  normalizeEntityName() {},
};
