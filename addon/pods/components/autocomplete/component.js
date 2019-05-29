/* global autocomplete */
import { later } from '@ember/runloop';
import { classNames, layout } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import TextField from '@ember/component/text-field';
import template from './template';

/**
 * This `{{autocomplete}}` component is a textbox powered by `autocomplete.js`
 * and Ember Data's `store` in fetching type ahead completion results that your
 * user can choose.
 */
@classNames('ember-data-autocomplete-js')
@layout(template)
export default class Autocomplete extends TextField {

  /** Services
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * The Ember Data `store` service that is used to query the data.
   *
   * @private
   * @type {DS.Store}
   */
  @service store;

  /** Fields
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * A hash containing any additional filters that may be required to filter the returned
   * autocomplete results.
   *
   * ```handlebars
   * <Autocomplete ... @additionalFilters=(hash by_active=true) ... />
   * ```
   *
   * @argument
   * @type('Hash')
   */
  additionalFilters = {};

  /**
   * The name of the filter that will be passed whatever the user keys into the textbox.
   *
   * ```handlebars
   * <Autocomplete ... @filter="by_name_search" ... />
   * ```
   *
   * @argument
   * @type {string}
   */
  filter = '';

  displayKey = 'id';

  /**
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

  suggestion = undefined;

  /**
   * The globalOptions for the autocomplete initialization.
   * TODO: should these be merge-able?
   *
   * @see https://github.com/algolia/autocomplete.js#global-options
   * @link https://github.com/algolia/autocomplete.js#global-options
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

  /** Methods
   ------------------------------------------------------------------------------------------------------------------ */
  /**
   * The Autocomplete instance that is created on #didInsertElement.
   * @type {Autocomplete}
   * @private
   */
  _autocompleteInstance = null;

  /**
   * The html `#id` selector of this component used to instantiate the `Autocomplete` instance.
   * @return {string}
   * @private
   */
  @computed('elementId') get _selector() {
    return `#${this.elementId}`;
  }

  /**
   * Triggered when the query is autocompleted. Autocompleted means the query was changed to the hint.
   * The event handler will be invoked with 3 arguments: the jQuery event object, the suggestion
   * object, and the name of the dataset the suggestion belongs to.
   *
   * @see https://github.com/algolia/autocomplete.js#events
   */
  autocompleted() {
    // override accordingly
  }

  /**
   * Triggered when the dropdown menu of the autocomplete is closed.
   *
   * @see https://github.com/algolia/autocomplete.js#events
   */
  closed() {
    // override accordingly
  }

  /**
   * Triggered when the dropdown menu cursor is moved to a different suggestion. The event
   * handler will be invoked with 3 arguments: the jQuery event object, the suggestion object, and
   * the name of the dataset the suggestion belongs to.
   *
   * @see https://github.com/algolia/autocomplete.js#events
   */
  cursorChanged() {
    // override accordingly
  }

  /**
   * Triggered when the cursor leaves the selections or its current index is lower than 0.
   *
   * @see https://github.com/algolia/autocomplete.js#events
   */
  cursorRemoved() {
    // override accordingly
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    this._fixAutofocus();
    this._initializeAutocomplete();
  }

  /**
   * Triggered when all datasets are empty.
   *
   * @see https://github.com/algolia/autocomplete.js#events
   */
  empty(/*event*/) {
    // override accordingly
  }

  /**
   * Triggered when the dropdown menu of the autocomplete is opened.
   *
   * @see https://github.com/algolia/autocomplete.js#events
   */
  opened(/*event*/) {
    // override accordingly
  }

  /**
   * Triggered when appendTo is used and the wrapper is resized/repositionned.
   *
   * @see https://github.com/algolia/autocomplete.js#events
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
   * @see https://github.com/algolia/autocomplete.js#events
   */
  selected(/*event, chosenItem, dataSetNameOrNumber, context*/) {
    // override accordingly
  }

  /**
   * Triggered when the dropdown menu of the autocomplete is shown (opened and non-empty).
   *
   * @see https://github.com/algolia/autocomplete.js#events
   */
  shown(/*event*/) {
    // override accordingly
  }

  /** Private
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * Triggered when a dataset is rendered.
   *
   * @see https://github.com/algolia/autocomplete.js#events
   */
  updated(/*event*/) {
    // override accordingly
  }

  /**
   * Destroy the #_autocompleteInstance instance that was created during #didInsertElement.
   */
  willDestroy() {
    this._autocompleteInstance.autocomplete.destroy();
    super.willDestroy();
  }

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
      displayKey: this.displayKey,
      name: `dataset-id-${this.elementId}`,
      source: function (query, callback) {
        const filterHash = self.additionalFilters;
        filterHash[self.filter] = query;
        callback(
          self.store.loadRecords(
            self.modelName, {
              filter: filterHash,
              include: self.include,
              sort: self.sort
            })
            .toArray()
        );
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
}
