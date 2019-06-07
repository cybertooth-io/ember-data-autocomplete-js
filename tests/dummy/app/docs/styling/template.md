# Styling

Styling is trivial and is up to you.  You are responsible for adding this CSS/SCSS to your app.

## Algolia Default

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

## Bootstrap 4'ish

I found an answer on 
[Stackoverflow with a relatively pleasant example in CodePen](https://stackoverflow.com/a/46787947/545137).
Give this a try if you want. 

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

.aa-dropdown-menu {
  position: relative;
  top: -6px;
  border-radius: 3px;
  margin: 6px 0 0;
  padding: 0;
  text-align: left;
  height: auto;
  position: relative;
  background: transparent;
  border: none;
  width: 100%;
  left: 0 !important;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2), 0 2px 3px 0 rgba(0, 0, 0, 0.1);
}

.aa-dropdown-menu:before {
  position: absolute;
  content: '';
  width: 14px;
  height: 14px;
  background: #fff;
  z-index: 0;
  top: -7px;
  border-top: 1px solid #D9D9D9;
  border-right: 1px solid #D9D9D9;
  transform: rotate(-45deg);
  border-radius: 2px;
  z-index: 999;
  display: block;
  left: 24px;
}

.aa-dropdown-menu .aa-suggestions {
  position: relative;
  z-index: 1000;
}

.aa-dropdown-menu [class^="aa-dataset-"] {
  background-color: #fff;
  position: relative;
  border: solid 1px #D9D9D9;
  border-radius: 3px;
  overflow: auto;
  padding: 8px 8px 8px;
}

.aa-dropdown-menu * {
  box-sizing: border-box;
}


.aa-suggestion {
  font-size: 1.1em;
  padding: 4px 4px 0;
  display: block;
  width: 100%;
  height: 38px;
  clear: both;
}

.aa-suggestion span {
  white-space: nowrap !important;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  float: left;
  line-height: 2em;
  width: calc(100% - 30px);
}

.aa-suggestion.aa-cursor {
  background: #eee;
}
```
## And Guess What?

If you don't like the default styling, you can change it.  But I'm sure not going
to explain that here.
