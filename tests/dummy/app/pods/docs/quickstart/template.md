# Quickstart

Let's say in your Ember Data world you have a `User` model.  We'll use JSON-API semantics to
search your users through Ember Data's `store` and then render them in the autocomplete control.

Below is an example of a template.

{{#docs-snippet name="template.hbs" title="app/templates/.../some-route.hbs"}}
  <Autocomplete 
    @displayKey="fullName"
    @filter="by_name_search" 
    @modelName="user" 
    @selected={{action "onSelected"}} 
    @sort="last-name,first-name"
  />
{{/docs-snippet}}

And below is an example of the controller's action that raises an alert containing a message
about the user that was chosen from the autocomplete.js text input.

{{#docs-snippet name="controller.js" title="app/controllers/.../some-controller.js"}}
  // ...
  @action onSelected(event, user/*, dataset, context*/) {
    alert(`You chose ${user.firstName}!!!`);
    return true;
  }
  // ...
{{/docs-snippet}}
