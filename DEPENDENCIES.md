# Dependencies

```bash
# Effortlessly import autocomplete.js and faker
# https://github.com/ef4/ember-auto-import
ember install ember-auto-import

# For documenting this addon; using es-doc
# Docs: https://ember-learn.github.io/ember-cli-addon-docs
# https://github.com/ember-learn/ember-cli-addon-docs
ember install ember-cli-addon-docs

# Runs coverage report when `COVERAGE=true`
# https://github.com/kategengler/ember-cli-code-coverage
ember install ember-cli-code-coverage@^1.0.0-beta.8

# To mock some data for demo and acceptance tests
# Docs: https://www.ember-cli-mirage.com/
# https://github.com/samselikoff/ember-cli-mirage
ember install ember-cli-mirage

# Ember Data ... obvious?
# https://github.com/emberjs/data
ember install ember-data

# Clever and cached store queries.
# Docs: https://embermap.github.io/ember-data-storefront
# https://github.com/embermap/ember-data-storefront
ember install ember-data-storefront

# Used for compatibility with components.
# Docs: https://ember-decorators.github.io/ember-decorators
# https://github.com/ember-decorators/ember-decorators
ember install ember-decorators

# To support Ember-2.x
# https://github.com/pzuraq/ember-decorators-polyfill
ember install ember-decorators-polyfill

# Forked from Algolia Autocomplete because the suggestion passed into the
# selected event is a JSON String instead of the Ember Data model instance.
# https://github.com/cybertooth-io/autocomplete.js
yarn add autocomplete.js-cybertooth.io

# Allows CircleCI to push code coverage information
# https://github.com/codeclimate/test-reporter
yarn add -D codeclimate-test-reporter

# Fake some user data for testing
# https://github.com/marak/Faker.js/
yarn add -P faker
```
