# Basic - Using Angle Bracket Invocation

A Mirage factory has generated 25 _faker_ users. Search for them by their first and last name.
Choosing a user will simply `alert` their birth date in ISO format.

## Try It

{{docs/demos/index/example}}

## What's Going On?

Behind the scenes, this Autocomplete textbox is using Ember Data with Storefront
to perform the following query to populate the suggestions:

```javascript
this.store.loadRecords('user', {
  filter: { by_name_search: 'TEXTBOX-VALUE' },
});
```
