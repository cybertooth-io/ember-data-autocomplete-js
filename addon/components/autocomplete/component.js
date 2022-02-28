/** @documenter yuidoc */

// Why `autocomplete.js-cybertooth.io`? https://github.com/algolia/autocomplete.js/issues/282
import autocomplete from 'autocomplete.js-cybertooth.io/dist/autocomplete';

import TextField from '@ember/component/text-field';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

/**
 * This `{{autocomplete}}` component is a textbox powered by `autocomplete.js`
 * and Ember Data's `store` in fetching type ahead completion results that your
 * user can choose.
 *
 * @class Autocomplete
 * @extends {TextField}
 * @public
 */
export default class Autocomplete extends TextField {
  /** Services
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * The Ember Data `store` service that is used to query the data.
   *
   * @access private
   * @field store
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
   * <Autocomplete ... @additionalFilters={{hash by_active=true}} ... />
   * ```
   *
   * @argument additionalFilters
   * @type {{}}
   */
  additionalFilters = {};

  /**
   * Defaults to 250ms.
   *
   * ```handlebars
   * <Autocomplete ... @debounce=100 ... />
   * ```
   *
   * The number of milliseconds to wait between keystrokes in the autocomplete textbox
   * before firing of the search request.
   *
   * @argument debounce
   * @type {number}
   */
  debounce = 250;

  /**
   * Required.  Defaults to `"id"`.
   *
   * ```handlebars
   * <Autocomplete ... @displayKey="fullName" ... />
   * ```
   *
   * ```handlebars
   * <Autocomplete ... @displayKey={{displayKeyFunctionName}} ... />
   * ```
   *
   * The derived value that will be set in the texbox upon choosing an item.  If the `suggestion`
   * argument is not supplied, then the `displayKey` derived value will also be presented in
   * the suggestions list that appears beneath the autocomplete textbox.
   *
   * @argument displayKey
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
   * @argument filter
   * @type {String}
   */
  filter = '';

  /**
   * The [globalOptions](https://github.com/algolia/autocomplete.js#global-options) for
   * the autocomplete initialization.
   *
   * Here are the defaults:
   *
   * ```javascript
   *  {
   *    appendTo: null,
   *    ariaLabel: null,
   *    autoselect: false,
   *    autoselectOnBlur: false,
   *    autoWidth: true,
   *    clearOnSelected: false,
   *    cssClasses: {
   *      cursor: 'cursor',
   *      dataset: 'dataset',
   *      dropdownMenu: 'dropdown-menu',
   *      empty: 'empty',
   *      hint: 'hint',
   *      input: 'input',
   *      noPrefix: false,
   *      prefix: 'aa',
   *      root: 'algolia-autocomplete',
   *      suggestion: 'suggestion',
   *      suggestions: 'suggestions'
   *    },
   *    debug: false,
   *    dropdownMenuContainer: null,
   *    hint: true,
   *    keyboardShortcuts: [],
   *    minLength: 1,
   *    openOnFocus: false,
   *    tabAutocomplete: true,
   *    templates: {
   *      dropdownMenu: null,
   *      header: null,
   *      footer: null,
   *      empty: null
   *    }
   *  }
   * ```
   *
   * You can override any one of these when declaring your component:
   *
   * ```handlebars
   *  <Autocomplete ... @globalOptions={{hash clearOnSelected=true}} />
   * ```
   * @argument globalOptions
   * @see https://github.com/algolia/autocomplete.js#global-options
   * @type {{}}
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
      suggestions: 'suggestions',
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
      empty: null,
    },
  };

  /**
   * Optional.
   *
   * The comma separated list of _dasherized_ relationship names that should be side-loaded
   * (included) in the JSON:API payload response.
   *
   * ```handlebars
   * <Autocomplete ... @include="roles" ... />
   * ```
   *
   * @argument include
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
   * @argument modelName
   * @type {String}
   */
  modelName = '';

  /**
   * Optional & Experimental.
   *
   * Defaults to page of size 10.
   *
   * ```handlebars
   * <Autocomplete ... @page={{hash size=5}} ... />
   * ```
   *
   * You can control how many records are being returned by your JSON:API
   * endpoint by passing the page size.
   *
   * @argument page
   * @experimental
   * @type {{number: number, size: number}}
   */
  page = {
    number: 1,
    size: 10,
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
   * @argument sort
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
   *  <Autocomplete ... @suggestion={{suggestByFirstAndLastName}}/>
   * ```
   *
   * @argument suggestion
   * @param {Object} model - the model instance the was retrieved by the search that you
   * can use to create the suggestion
   * @type {function}
   * @return {String} the suggestion value wrapped in a `<p>` element.
   */
  suggestion = undefined;

  /** Computed
   ------------------------------------------------------------------------------------------------------------------ */
  /**
   * DO NOT TOUCH.
   *
   * The Autocomplete instance that is created on `didInsertElement`.
   *
   * @field _autocompleteInstance
   * @private
   * @type {Autocomplete}
   */
  _autocompleteInstance = null;

  /** Actions
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * The html `#id` selector of this component used to instantiate the `Autocomplete` instance.
   *
   * @property _selector
   * @private
   * @return {String}
   */
  get _selector() {
    return `#${this.elementId}`;
  }

  /**
   * Triggered when the query is autocompleted. Autocompleted means the query was changed to the hint.
   * The event handler will be invoked with 3 arguments: the jQuery event object, the suggestion
   * object, and the name of the dataset the suggestion belongs to.
   *
   * @method autocompleted
   * @public
   * @param {Event} event - the event object
   * @param {Object} chosenItem - the Ember Data instance that was selected
   * @param {String} dataSetNameOrNumber - the name of the autocomplete.js dataset
   * @return {autocompleted}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  autocompleted(/*event, chosenItem, dataSetNameOrNumber*/) {
    // override accordingly
  }

  /**
   * Triggered when the dropdown menu of the autocomplete is closed.
   *
   * @method closed
   * @public
   * @return {closed}
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
   * @method cursorChanged
   * @public
   * @param {Event} event - the event object
   * @param {Object} chosenItem - the Ember Data instance that was selected
   * @param {String} dataSetNameOrNumber - the name of the autocomplete.js dataset
   * @return {cursorChanged}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  cursorChanged(/*event, chosenItem, dataSetNameOrNumber*/) {
    // override accordingly
  }

  /**
   * Triggered when the cursor leaves the selections or its current index is lower than 0.
   *
   * @method cursorRemoved
   * @public
   * @return {cursorRemoved}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  cursorRemoved() {
    // override accordingly
  }

  /**
   * Triggered when all datasets are empty.
   *
   * @method empty
   * @public
   * @param {Event} event - the event object
   * @return {empty}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  empty(/*event*/) {
    // override accordingly
  }

  /**
   * Triggered when the dropdown menu of the autocomplete is opened.
   *
   * @method opened
   * @public
   * @param {Event} event - the event object
   * @return {opened}
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  opened(/*event*/) {
    // override accordingly
  }

  /**
   * Triggered when appendTo is used and the wrapper is resized/repositionned.
   *
   * @method redrawn
   * @public
   * @return {redrawn}
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
   * @param {Event} event - the event object
   * @param {Object} chosenItem - the Ember Data instance that was selected
   * @param {String} dataSetNameOrNumber - the name of the autocomplete.js dataset
   * @param {Object} context -
   * @param {String} context.selectionMethod - the string describing how the selection
   * was made (`click`, `enterKey`, etc.)
   * @return {selected} when a suggestion is selected
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  selected(/*event, chosenItem, dataSetNameOrNumber, context*/) {
    // override accordingly
  }

  /**
   * Triggered when the dropdown menu of the autocomplete is shown (opened and non-empty).
   *
   * @param {Event} event - the event object
   * @return {shown} when the dropdown menu of the autocomplete is shown
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  shown(/*event*/) {
    // override accordingly
  }

  /**
   * Triggered when a dataset is rendered.
   *
   * @param {Event} event - the event object
   * @return {updated} when a dataset is rendered
   * @see https://github.com/algolia/autocomplete.js#events
   * @type {Action}
   */
  updated(/*event*/) {
    // override accordingly
  }

  /** Methods
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * @method didInsertElement
   * @public
   */
  didInsertElement() {
    super.didInsertElement(...arguments);
    this._fixAutofocus();
    this._initializeAutocomplete();
  }

  /**
   * Destroy the #_autocompleteInstance instance that was created during #didInsertElement.
   *
   * @method willDestroy
   * @public
   */
  willDestroy() {
    this._autocompleteInstance.autocomplete.destroy();
    super.willDestroy(...arguments);
  }

  /** Private
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * Fixes Ember's weird bug where autofocus can't be re-triggered on subsequent transitions.
   *
   * @method _fixAutofocus
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
   * @method _initializeAutocomplete
   * @private
   */
  _initializeAutocomplete() {
    const self = this;
    this._autocompleteInstance = autocomplete(this._selector, this.globalOptions, [
      {
        debounce: self.debounce,
        displayKey: this.displayKey,
        name: `dataset-id-${this.elementId}`,
        source: function (query, callback) {
          self.store.loadRecords(self.modelName, self._queryOptions(query)).then(response => {
            const noWay = [];
            response.forEach(modelInstance => noWay.push(modelInstance));
            callback(noWay);
            return response;
          });
        },
        templates: {
          suggestion: this.suggestion ? this.suggestion : null,
        },
      },
    ])
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
   * @method _queryOptions
   * @param {String} filterValue - the textbox value
   * @private
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
