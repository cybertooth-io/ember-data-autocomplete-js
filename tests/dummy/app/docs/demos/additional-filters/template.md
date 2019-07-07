# Additional Filters

By default, the text input value will be applied to the filter you assign to `@filter`.

In many use cases, you need to apply multiple filters to your lookup query.  JSONAPI handles
this very elegantly and we give you access to that feature through the `@additionalFilters`
argument.

For example, maybe you want only the active users, and your back-end has a `by_active` filter
that accepts a boolean value.  Here's how you'd use that:
 
## Try It

{{docs/demos/additional-filters/example}}

## What's Going On?

Notice that you can supply multiple additional filters.  In this example, we've passed the `by_active`
filter to `@additonalFilters` as such:

```handlebars
@additionalFilters={{hash by_active=true}}
```

And, behind the scenes, the Ember Data `store`'s `query` method (or `loadRecords` if you've configured 
your query to run through Storefront) will fire somewhat as follows:

```javascript
this.store.loadRecords('user', { 
  filter: { 
    by_name_search: 'TEXTBOX-VALUE',
    by_active: true
  }
})
```
 
