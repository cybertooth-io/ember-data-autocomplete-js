# How To Contribute

## Installation

- `git clone git@github.com:cybertooth-io/ember-data-autocomplete-js.git`
- `cd ember-data-autocomplete-js`
- `yarn`

### Building The Add-on

- `ember b`
- `ember build`

### Linting

- `yarn run lint:hbs`
- `yarn run lint:js`
- `yarn run lint:js -- --fix`

### Running tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `ember try:each` – Runs the test suite against multiple Ember versions

### Running The Dummy Application

- `ember server`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

## Upgrading The Add-On

When upgrading this add-on, after successfully performing `ember init` use the following
commands to install the following dependencies required by this add-on.

```bash
ember install ember-data-autocomplete-js
```

## Linking This Add-on For Local Testing

### Linking

Use yarn.

```bash
# from this add-on project
$ yarn link
# from the other project that depends on this add-on
$ yarn link ember-data-autocomplete-js
```

In your other project's `package.json`, set `"ember-data-autocomplete-js": "*",`

Note: I've actually had to go into my _other project_ and put this into its `package.json`:
`"ember-data-autocomplete-js": "link:../ember-data-autocomplete-js",`

### Unlinking

Again, use yarn.

```bash
# from this add-on project
$ yarn unlink
# from the other project that linked to this add-on
$ yarn unlink ember-data-autocomplete-js
```

## Committing Code

Fork and submit a pull request.

Try to use an emoji to help describe the commit: https://gitmoji.carloscuesta.me/

## Releasing & Publishing To NPM

```bash
# `yarn publish` will prompt you for the next/new version name
$ yarn publish
$ git push
$ git push --tags
```
