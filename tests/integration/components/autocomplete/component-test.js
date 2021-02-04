import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, skip } from 'qunit';

module('Integration | Component | autocomplete', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: this stopped working at ember-cli@3.13
  skip('when rendering with handlebars', async function (assert) {
    await render(hbs`{{autocomplete}}`);

    assert.equal(
      this.element.getElementsByClassName('algolia-autocomplete').length,
      1,
      'Should be wrapped by autocomplete span'
    );
    assert.equal(
      this.element.getElementsByClassName('ember-data-autocomplete-js').length,
      2,
      'Should be two inputs: one for the hint & one for the typed values'
    );
  });

  // TODO: this stopped working at ember-cli@3.15
  skip('when rendering with angle-brackets', async function (assert) {
    await render(hbs`<Autocomplete />`);

    assert.equal(
      this.element.getElementsByClassName('algolia-autocomplete').length,
      1,
      'Should be wrapped by autocomplete span'
    );
    assert.equal(
      this.element.getElementsByClassName('ember-data-autocomplete-js').length,
      2,
      'Should be two inputs: one for the hint & one for the typed values'
    );
  });
});
