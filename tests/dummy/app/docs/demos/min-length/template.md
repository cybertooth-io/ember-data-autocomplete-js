# `minLength`

The `minLength` global option controls how many keystrokes are required before the autocomplete
fires a fetch for data. By default, `minLength` is set to 1 character.

Sometimes you may want the down-arrow key to open up the default fetched set. In this case set the
`minLength` global option to `0`.

### Warning

There seems to be an autocomplete.js bug when `hint` is enabled an you simply open the autocomplete
without typing any text. It seems the placeholder text and the muted autocomplete hint text are
overlapping each other.

A workaround for this issue is to also set the global option `hint` to `false`.

## Try It

{{docs/demos/min-length/example}}

## What's Going On?

To edit the `autocomplete.js` global option you simply need to use the `hash` helper to pass overriding
arguments to the component.

In this case we pass the `minLength` option to `@globalOptions` of the autocomplete component:

```handlebars
@globalOptions={{hash minLength=0}}
```
