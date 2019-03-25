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
  
    @computed('firstName', 'lastName') fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
{{/docs-snippet}}

## Autocomplete Component

Perhaps you want to choose a user from an autocomplete text box, below is an example
of the component you'd invoke from your template.

{{#docs-snippet name="template.hbs" title="app/templates/some-route.hbs"}}
  Autocomplete 
    @displayKey="fullName"
    @filter="by_name_search" 
    @modelName="user" 
    @selected=(action "onSelected") 
    @sort="last-name,first-name"
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

{{#docs-snippet name="controller.js" title="app/controllers/some-route.js"}}
  import { action } from '@ember-decorators/object'
  import Controller from '@ember/controller';
  
  export default class IndexController extends Controller {
    @action onSelected(event, user, dataset, context) {
      // do something with the chosen `user` parameter
      alert(userInstance.dateOfBirth.toISOString());
      return true;
    }
  }
{{/docs-snippet}}

## Autocomplete Component's Use Of The Store

So what happened to populate the autocomplete options?  Effectively, the Ember Data
`store` was called upon to perform a
[`loadRecords`](https://embermap.github.io/ember-data-storefront/docs/api/mixins/loadable-store#loadRecords)
(basically an Ember Data 
[`query`](https://api.emberjs.com/ember-data/release/classes/DS.Store/methods/query?anchor=query)).

{{#docs-snippet name="autocomplete.js" title="<Autocomplete> Component Internals"}}
  // ...
  const textboxValue = this.value;    // whatever the user typed
  const modelName = this.modelName;   // => "user" - the @modelName value you passed into the component
  const filter = this.filter;         // => "by_name_search" the @filter value you passed into the component
  const include = this.include;       // => "" the @include value you passed into the component
  const sort = this.sort;             // => "last-name,first-name" the @sort value you passed into the component
  
  this.store.loadRecords(modelName {
    filter: { this.filter: textboxValue },
    include: this.include,
    sort: this.sort
  })
  // ...
{{/docs-snippet}}
