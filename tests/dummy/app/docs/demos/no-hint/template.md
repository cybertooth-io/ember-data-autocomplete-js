# Turning Off `hint`

The hint is the muted text that appears in the textbox when you start typing an option
that is a near match. By default, hint is enabled. To turn it off, toggle the `hint`
global option to false.

## Try It

{{docs/demos/no-hint/example}}

## What's Going On?

To edit the `autocomplete.js` global option you simply need to use the `hash` helper to pass overriding
arguments to the component.

In this case we want to edit the `hint` key within `@globalOptions`:

```handlebars
@globalOptions={{hash hint=false}}
```

[A list of **Global Options** can be found in the API documentation](/docs/api/components/autocomplete#globalOptions).
