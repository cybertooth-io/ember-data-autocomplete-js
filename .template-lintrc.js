'use strict';

module.exports = {
  extends: ['recommended'],
  rules: {
    'no-curly-component-invocation': { allow: ['autocomplete', 'viewer.main', 'viewer.nav', 'demo.example'] },
    'no-autofocus-attribute': false,
  },
};
