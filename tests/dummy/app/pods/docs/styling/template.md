# Styling

Styling is trivial and is up to you.

Algolia `autocomplete.js` gives you a helping hand in their 
[look and feel page](https://github.com/algolia/autocomplete.js/blob/master/README.md#look-and-feel).

Poaching from their site, simply add this to your `app/styles/app.css` (or `app/styles/app.scss` if you're
using SASS:

```css
.algolia-autocomplete {
  width: 100%;
}

.algolia-autocomplete .aa-input, .algolia-autocomplete .aa-hint {
  width: 100%;
}

.algolia-autocomplete .aa-hint {
  color: #999;
}

.algolia-autocomplete .aa-dropdown-menu {
  width: 100%;
  background-color: #fff;
  border: 1px solid #999;
  border-top: none;
}

.algolia-autocomplete .aa-dropdown-menu .aa-suggestion {
  cursor: pointer;
  padding: 5px 4px;
}

.algolia-autocomplete .aa-dropdown-menu .aa-suggestion.aa-cursor {
  background-color: #B2D7FF;
}

.algolia-autocomplete .aa-dropdown-menu .aa-suggestion em {
  font-weight: bold;
  font-style: normal;
}
```
