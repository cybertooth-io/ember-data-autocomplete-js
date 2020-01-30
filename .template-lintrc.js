'use strict';

module.exports = {
  extends: 'octane',
  rules: {
    'no-curly-component-invocation': { allow: ['viewer.main', 'viewer.nav', 'demo.example'] }
  }
};
