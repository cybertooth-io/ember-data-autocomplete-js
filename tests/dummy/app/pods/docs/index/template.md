# Installation

## Install Or Upgrade

{{#docs-snippet name="terminal-install" title="Terminal"}}
  ember install ember-data-autocomplete-js
{{/docs-snippet}}

## What Happens

1. `ember-data-autocomplete-js` is downloaded and added to your project.
1. Algolia's `autocomplete.js` npm package is installed and imported globally.
1. `ember-data` is installed *or upgraded*.  If you don't want the upgrade make sure
to edit your `package.json` `devDependencies` rolling back the new `ember-data` version
number.
1. `ember-data-storefront` is installed because we use the `loadRecords` method that
to perform queries on your model.
