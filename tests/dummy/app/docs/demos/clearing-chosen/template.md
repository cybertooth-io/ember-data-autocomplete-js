# Clearing The Chosen Option To Re-Use The Autocomplete

You'll use autocomplete to choose an option and then do something with the chosen item
like save it to your database. Once an item is chosen, the autocomplete is filled in with
the value provided by the `displayKey` key.

Sometimes, you'll want to re-use the autocomplete to choose another item. Set the global option
`clearOnSelected` to `true` in order to enable this behaviour. Notice after choosing an item the
autocomplete textbox is emptied after selection.

## Try It

{{docs/demos/clearing-chosen/example}}

## What's Going On?

To edit the `autocomplete.js` global option you simply need to use the `hash` helper to pass overriding
arguments to the component.

In this case we pass the `clearOnSelected` option to `@globalOptions` of the autocomplete component:

```handlebars
@globalOptions={{hash clearOnSelected=true}}
```

[A list of **Global Options** can be found in the API documentation](/docs/api/components/autocomplete#globalOptions).
