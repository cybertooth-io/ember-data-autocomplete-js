/** @documenter esdoc */

import { isPresent } from '@ember/utils';
import { later } from '@ember/runloop';
import { classNames, layout } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
// Why `autocomplete.js-cybertooth.io`? https://github.com/algolia/autocomplete.js/issues/282
import autocomplete from 'autocomplete.js-cybertooth.io';
import TextField from '@ember/component/text-field';
import template from './template';

/**
 * This `{{autocomplete}}` component is a textbox powered by `autocomplete.js`
 * and Ember Data's `store` in fetching type ahead completion results that your
 * user can choose.
 *
 * @extends {TextField}
 */
@classNames('ember-data-autocomplete-js')
@layout(template)
export default class Autocomplete extends TextField {

  /** Services
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * The Ember Data `store` service that is used to query the data.
   *
   * @access private
   * @type {DS.Store}
   */
  @service store;

  /** Arguments
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * Optional.
   *
   * A hash containing any additional filters that may be required to filter the returned
   * autocomplete results.
   *
   * ```handlebars
   * <Autocomplete ... @additionalFilters=(hash by_active=true) ... />
   * ```
   *
   * @argument
   * @type {Hash}
   */
  additionalFilters = {};

  /**
   * Defaults to 250ms.
   *
   * The number of milliseconds to wait between keystrokes in the autocomplete textbox
   * before firing of the search request.
   *
   * @argument
   * @type {number}
   */
  debounce = 250;

  /**
   * Required.  Defaults to `"id"`.
   *
   * The derived value that will be set in the texbox upon choosing an item.  If the `suggestion`
   * argument is not supplied, then the `displayKey` derived value will also be presented in
   * the suggestions list that appears beneath the autocomplete textbox.
   *
   * @argument
   * @type {String|function}
   */
  displayKey = 'id';

  /**
   * Required.
   *
   * The name of the filter that will be passed whatever the user keys into the textbox.
   *
   * ```handlebars
   * <Autocomplete ... @filter="by_name_search" ... />
   * ```
   *
   * @argument
   * @type {String}
   */
  filter = '';

  /**
   * Optional.
   *
   * The comma separated list of _dasherized_ relationship names that should be side-loaded
   * (included) in the JSON-API payload response.
   *
   * ```handlebars
   * <Autocomplete ... @include="roles" ... />
   * ```
   *
   * @argument
   * @type {String}
   */
  include = '';

  /**
   * Required.
   *
   * The _dasherized_ Ember Data model name that will be queried for autocomplete results.
   *
   * ```handlebars
   * <Autocomplete ... @modelName="user" ... />
   * ```
   *
   * @argument
   * @type {String}
   */
  modelName = '';

  /**
   * Required.  Experimental.
   *
   * You can control how many records are being returned by your JSON-API
   * endpoint by passing the page size.
   *
   * @argument
   * @experimental
   * @type {{number: number, size: number}}
   */
  page = {
    number: 1,
    size: 10
  };

  /**
   * Optional.
   *
   * The comma separated list of _dasherized_ attribute names that will be used to sort the
   * results server side.
   *
   * ```handlebars
   * <Autocomplete ... @sort="last-name,first-name,email" ... />
   * ```
   *
   * @argument
   * @type {String}
   */
  sort = '';

  /**
   * Optional.
   *
   * The suggestion value that will be rendered in the list of options that
   * appears beneath the autocomplete textbox.  We suggest wrapping your
   * value with `<p>` tag.
   *
   * The best was to implement this function is in the `Component`
   * or `Controller` of the template that this <Autocomplete/> is being
   * rendered in.
   *
   * For example:
   *
   * ```javascript
   *  // app/controllers/.../somewhere.js
   *  suggestByFirstAndLastName: function(model) {
   *    return `<p>${model.firstName} ${model.lastName}</p>`;
   *  }
   * ```
   *
   * ```handlebars
   *  <Autocomplete ... @suggestion=suggestByFirstAndLastName/>
   * ```
   *
   * @argument
   * @param {Object} model - the model instance the was retrieved by the search that you
   * can use to create the suggestion
   * @type {function}
   * @return {String} the suggestion value wrapped in a `<p>` element.
   */
  suggestion = undefined;

  /**
   * The [globalOptions](https://github.com/algolia/autocomplete.js#global-options) for
   * the autocomplete initialization.
   *
   * TODO: should these be merge-able?
   *
   * @argument
   * @see https://github.com/algolia/autocomplete.js#global-options
   * @type {{dropdownMenuContainer: null, keyboardShortcuts: Array, debug: boolean, cssClasses: {cursor: string, dropdownMenu: string, input: string, prefix: string, hint: string, root: string, suggestion: string, suggestions: string, dataset: string, noPrefix: boolean, empty: string}, minLength: number, templates: {dropdownMenu: null, footer: null, header: null, empty: null}, tabAutocomplete: boolean, ariaLabel: null, clearOnSelected: boolean, autoselectOnBlur: boolean, openOnFocus: boolean, hint: boolean, appendTo: null, autoWidth: boolean, autoselect: boolean}}
   */
  globalOptions = {
    appendTo: null,
    ariaLabel: null,
    autoselect: false,
    autoselectOnBlur: false,
    autoWidth: true,
    clearOnSelected: false,
    cssClasses: {
      cursor: 'cursor',
      dataset: 'dataset',
      dropdownMenu: 'dropdown-menu',
      empty: 'empty',
      hint: 'hint',
      input: 'input',
      noPrefix: false,
      prefix: 'aa',
      root: 'algolia-autocomplete',
      suggestion: 'suggestion',
      suggestions: 'suggestions'
    },
    debug: false,
    dropdownMenuContainer: null,
    hint: true,
    keyboardShortcuts: [],
    minLength: 1,
    openOnFocus: false,
    tabAutocomplete: true,
    templates: {
      dropdownMenu: null,
      header: null,
      footer: null,
      empty: null
    }
  };

  /** Computed
   ------------------------------------------------------------------------------------------------------------------ */
  /**
   * DO NOT TOUCH.
   *
   * The Autocomplete instance that is created on `didInsertElement`.
   *
   * @private
   * @type {Autocomplete}
   */
  _autocompleteInstance = null;

  /** Actions
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * The html `#id` selector of this component used to instantiate the `Autocomplete` instance.
   *
   * @private
   * @return {string}
   */
  @computed('elementId') get _selector() {
    return `#${this.elementId}`;
  }

  /**
   * Triggered when the query is autocompleted. Autocompleted means the query was changed to the hint.
   * The event handler will be invoked with 3 arguments: the jQuery event object, the suggestion
   * object, and the name of the dataset the suggestion belongs to.
   *
   * @emits {autocompleted}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  autocompleted() {
    // override accordingly
  }

  /**
   * Triggered when the dropdown menu of the autocomplete is closed.
   *
   * @emits {closed}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  closed() {
    // override accordingly
  }

  /**
   * Triggered when the dropdown menu cursor is moved to a different suggestion. The event
   * handler will be invoked with 3 arguments: the jQuery event object, the suggestion object, and
   * the name of the dataset the suggestion belongs to.
   *
   * @emits {cursorChanged}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  cursorChanged() {
    // override accordingly
  }

  /**
   * Triggered when the cursor leaves the selections or its current index is lower than 0.
   *
   * @emits {cursorRemoved}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  cursorRemoved() {
    // override accordingly
  }

  /**
   * Triggered when all datasets are empty.
   *
   * @emits {empty}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  empty(/*event*/) {
    // override accordingly
  }

  /**
   * Triggered when the dropdown menu of the autocomplete is opened.
   *
   * @emits {opened}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  opened(/*event*/) {
    // override accordingly
  }

  /**
   * Triggered when appendTo is used and the wrapper is resized/repositionned.
   *
   * @emits {redrawn}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  redrawn() {
    // override accordingly
  }

  /**
   * Triggered when a suggestion from the dropdown menu is selected. The event handler will be invoked
   * with the following arguments: the jQuery event object, the suggestion object, the name of the
   * dataset the suggestion belongs to and a context object. The context contains a .selectionMethod
   * key that can be either click, enterKey, tabKey or blur, depending how the suggestion was selected.
   *
   * @emits {selected} when a suggestion is selected
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  selected(/*event, chosenItem, dataSetNameOrNumber, context*/) {
    // override accordingly
  }

  /**
   * Triggered when the dropdown menu of the autocomplete is shown (opened and non-empty).
   *
   * @emits {shown} when the dropdown menu of the autocomplete is shown
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  shown(/*event*/) {
    // override accordingly
  }

  /**
   * Triggered when a dataset is rendered.
   *
   * @emits {updated} when a dataset is rendered
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  updated(/*event*/) {
    // override accordingly
  }

  /** Methods
   ------------------------------------------------------------------------------------------------------------------ */

  didInsertElement() {
    super.didInsertElement(...arguments);
    this._fixAutofocus();
    this._initializeAutocomplete();
  }

  /** Private
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * Destroy the #_autocompleteInstance instance that was created during #didInsertElement.
   */
  willDestroy() {
    this._autocompleteInstance.autocomplete.destroy();
    super.willDestroy(...arguments);
  }

  /**
   * Fixes Ember's weird bug where autofocus can't be re-triggered on subsequent transitions.
   *
   * @private
   */
  _fixAutofocus() {
    if (this.element.getAttributeNames().includes('autofocus')) {
      later(1, () => {
        this.element.focus();
      });
    }
  }

  /**
   * Responsible for locating this component's `<input>` element and passing it
   * to Algolia's `autocomplete.js` library for initialisation.
   *
   * @private
   */
  _initializeAutocomplete() {
    const self = this;
    this._autocompleteInstance = autocomplete(this._selector, this.globalOptions, [{
      debounce: self.debounce,
      displayKey: this.displayKey,
      name: `dataset-id-${this.elementId}`,
      source: function (query, callback) {
        self.store
          .loadRecords(self.modelName, self._queryOptions(query))
          .then(response => {
            const noWay = [];
            response.forEach(modelInstance => noWay.push(modelInstance));
            callback(noWay);
            return response;
          });
      },
      templates: {
        suggestion: this.suggestion ? this.suggestion : null
      }
    }])
      .on('autocomplete:autocompleted', this.autocompleted)
      .on('autocomplete:closed', this.closed)
      .on('autocomplete:cursorchanged', this.cursorChanged)
      .on('autocomplete:cursorremoved', this.cursorRemoved)
      .on('autocomplete:empty', this.empty)
      .on('autocomplete:opened', this.opened)
      .on('autocomplete:redrawn', this.redrawn)
      .on('autocomplete:selected', this.selected)
      .on('autocomplete:shown', this.shown)
      .on('autocomplete:updated', this.updated);
  }

  /**
   * @param {String} filterValue - the textbox value
   * @private
   * @todo unit tests of this
   */
  _queryOptions(filterValue) {
    const queryOptions = { filter: {} };
    queryOptions.filter[this.filter] = filterValue;
    if (isPresent(this.additionalFilters)) {
      Object.assign(queryOptions.filter, this.additionalFilters);
    }
    if (isPresent(this.include)) {
      queryOptions.include = this.include;
    }
    if (isPresent(this.page)) {
      queryOptions.page = this.page;
    }
    if (isPresent(this.sort)) {
      queryOptions.sort = this.sort;
    }

    return queryOptions;
  }
}
