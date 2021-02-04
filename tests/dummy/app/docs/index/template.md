# Installation

## Install Or Upgrade

If you don't already have it, install Ember Data:

{{#docs-snippet name="terminal-install-ember-data" title="Terminal"}}
ember install ember-data
{{/docs-snippet}}

Next, install Ember Data Autocomplete:

{{#docs-snippet name="terminal-install-ember-data-autocomplete-js" title="Terminal"}}
ember install ember-data-autocomplete-js
{{/docs-snippet}}

## What Happens

1. The `ember-data-autocomplete-js` addon is downloaded and added to your project.
1. A fork of Algolia's `autocomplete.js` npm package is automatically added as a dependency
1. `ember-data-storefront` is brought in as a dependency because we use its clever `loadRecords`
   method to perform queries that populate the autocomplete suggestions.
