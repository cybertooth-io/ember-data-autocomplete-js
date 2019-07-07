# Page Size

**Don't bring back all million records**!  By default, the autocomplete textbox implementation will only
bring back the FIRST page of size TEN of the results from your JSON:API query.

You can alter this page size by supplying a hash to the `@page` argument.

## Try It

{{docs/demos/page-size/example}}

## What's Going On?

When the `store`'s `query` (or `loadRecords` when Storefront is enabled), the `page[size]` query
parameter is appended to your request.  Your JSON:API endpoint will use this to reduce the size
of the payload returned.

To apply the page size, add the following to your component invocation:

```handlebars
@page={{hash size=5}}
```
 
And, This is what the query looks like behind the scenes through Ember Data:

```javascript
this.store.query('user', { 
  filter: { by_name_search: 'TEXTBOX-VALUE' },
  page: {
    size: 5
  }
})
```
