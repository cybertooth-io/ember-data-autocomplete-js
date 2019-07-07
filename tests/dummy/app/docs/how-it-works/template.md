# How It Works

<aside>
  These examples demonstrate component invocation using Angle Brackets and named arguments syntax (`@`).
</aside>

We use the Ember Data store and JSON-API semantics to search for your model results.

## User Model

Let's say in your Ember Data world you have a `User` model.

{{#docs-snippet name="user.js" title="app/model/user.js"}}
  import DS from 'ember-data';
  import { attr } from '@ember-decorators/data';
  import { computed } from '@ember-decorators/object'
  
  const { Model } = DS;
  
  export default class UserModel extends Model {
  
    /** Attributes
     ------------------------------------------------- */
  
    @attr('boolean') active;
    @attr('date') dateOfBirth;
    @attr('string') email;
    @attr('string') firstName;
    @attr('string') lastName;
  
    /** Computed
     ------------------------------------------------- */
  
    @computed('firstName', 'lastName') get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
{{/docs-snippet}}

## JSONAPI For The Win

By default, this component assumes that you're using the JSONAPI Ember Data adapter.  JSONAPI
comes with wonderful querying options like `filter`s, `sort`, `includes`, etc.

Here is an example of how we use the Ember Data `store` to query for data; **you don't write
any of this _query_ code**:

```javascript
// ...
this.store.query('some-model-name', {
  filter: {
    some_filter: 'some-filter-value',
    the_filter_using_autocomplete_text: 'textbox value'
  },
  include: 'some-relationship',
  sort: 'some-column'
})
// ...
``` 

## Autocomplete Component

Perhaps you want to choose a user from an autocomplete text box, below is an example
of the component you'd invoke from your template.

{{#docs-snippet name="how-it-works-template.hbs" title="app/templates/.../somewhere.hbs"}}
  <Autocomplete 
    @displayKey="fullName"
    @filter="by_name_search" 
    @modelName="user" 
    @selected={{action "chooseUser"}} 
    @sort="last-name,first-name"
  />
{{/docs-snippet}}

The `<Autocomplete>` component extends `@ember/component/text-field` and you're 
delivered an `<input>` element that is wrapped with Algolia's autocomplete after
it is inserted into the DOM.  _Why do you care that it's an input element?_  Simply
because you might want to style it.  Should you be using Bootstrap you could add
`class="form-control"` to get some style love.

## Responding To A Chosen Option

You need to bind an action to the `@selected` attribute which is responsible 
for doing something with the `User` instance that is chosen from the autocomplete
input.  Below is an example of what a typical action will look like.

<p/>

{{#docs-snippet name="how-it-works-controller.js" title="app/controllers/.../somewhere.js"}}
  import { action } from '@ember/object'
  import Controller from '@ember/controller';
  
  export default Controller.extend({
    @action chooseUser(event, user/*, dataset, context*/) {
      // do something with the chosen `user` model instance
      alert(`${user.firstName}'s birth date is ${user.dateOfBirth.toISOString()}`)
      return true;
    }
  }
{{/docs-snippet}}

## Autocomplete Component's Use Of The Store

So what happened to populate the autocomplete options?  Effectively, the Ember Data
`store` was called upon to perform Ember Storefront's
[`loadRecords`](https://embermap.github.io/ember-data-storefront/docs/api/mixins/loadable-store#loadRecords)
(basically an Ember Data 
[`query`](https://api.emberjs.com/ember-data/release/classes/DS.Store/methods/query?anchor=query)).
