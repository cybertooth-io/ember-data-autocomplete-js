import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | autocomplete', function (hooks) {
  setupRenderingTest(hooks);

  test('when rendering with handlebars', async function (assert) {
    await render(hbs`{{autocomplete}}`);

    assert.equal(this.element.getElementsByClassName('algolia-autocomplete').length, 1,
      'Should be wrapped by autocomplete span');
    assert.equal(this.element.getElementsByClassName('ember-data-autocomplete-js').length, 2,
      'Should be two inputs: one for the hint & one for the typed values');
  });

  test('when rendering with angle-brackets', async function (assert) {
    await render(hbs`<Autocomplete />`);

    assert.equal(this.element.getElementsByClassName('algolia-autocomplete').length, 1,
      'Should be wrapped by autocomplete span');
    assert.equal(this.element.getElementsByClassName('ember-data-autocomplete-js').length, 2,
      'Should be two inputs: one for the hint & one for the typed values');
  });
});
