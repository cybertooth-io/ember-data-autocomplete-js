# Empty Template

The empty template needs to be defined to handle when there are no results.

## Try It

{{docs/demos/empty-template/example}}

## What's Going On?

To edit the `autocomplete.js` global option you simply need to use the `hash` helper to pass overriding
arguments to the component.

In this case we want to edit the `template` hash embedded within the global options.  So to edit the
"empty" template we will supply the following to `@globalOptions`:

```handlebars
@globalOptions={{hash templates=(hash empty="<p><em>Nothing Found</em></p>")}}
```

[A list of **Global Options** can be found in the API documentation](/docs/api/components/autocomplete#globalOptions).
