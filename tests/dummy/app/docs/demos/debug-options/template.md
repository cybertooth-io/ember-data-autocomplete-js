# Viewing The Source Of The Rendered Options

By default, the autocomplete's `debug` option is set to false meaning that the rendered
options list will disappear after you click on an option.

Turn the global option `debug` to `true` so that you can _right-click_ to view the source of
your options.
 
## Try It

{{docs/demos/debug-options/example}}

## What's Going On?

To edit the `autocomplete.js` global option you simply need to use the `hash` helper to pass overriding
arguments to the component.

The `autocomplete.js` implementation includes the fancy `debug` option and it will make your
options stick to the DOM so you can inspect them with your browser's developer tools.

```handlebars
@globalOptions={{hash debug=true}}
```

[A list of **Global Options** can be found in the API documentation](/docs/api/components/autocomplete#globalOptions).
