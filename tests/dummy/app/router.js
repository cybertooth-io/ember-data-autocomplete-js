import config from 'dummy/config/environment';
import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  docsRoute(this, function () {
    this.route('how-it-works');
    this.route('quickstart');
    this.route('styling');
    this.route('demos', function () {
      this.route('additional-filters');
      this.route('clearing-chosen');
      this.route('customized-suggestion');
      this.route('debug-options');
      this.route('empty-template');
      this.route('handlebars-example');
      this.route('min-length');
      this.route('no-hint');
      this.route('page-size');
    });
  });

  this.route('not-found', { path: '/*path' });
});

export default Router;
