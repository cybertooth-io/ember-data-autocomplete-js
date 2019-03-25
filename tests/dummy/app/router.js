import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  docsRoute(this, function () {
    this.route('how-it-works');
    this.route('quickstart');
    this.route('demos', function () {
    });
  });
  this.route('not-found', { path: '/*path' });
  this.route('docs');
});

export default Router;
