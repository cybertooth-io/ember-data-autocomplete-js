# Customized Suggestion

A Mirage factory has generated 25 _faker_ users. Search for them by their first and last name.
Choosing a user will simply `alert` their birth date in ISO format.

## Try It

{{docs/demos/customized-suggestion/example}}

## What's Going On?

Just like in the Basic example, the autocomplete will use Ember Data to query
for the users based on the textbox input. What's new here is that a function
is being passed to `@suggestion`. This function is responsible for returning
a `<p>` wrapped string describing the suggestion.

In this case, the `suggestionCustomized` function inside my controller (or component,
whatever is tied to the template) concatenates the user's full name and email and then
beneath that in small text shows their date of birth.

```javascript
  suggestionCustomized(user) {
    return `<p>${user.fullName} - ${user.email}<br/><small>DOB: ${user.dateOfBirth.toLocaleString()}</small></p>`;
  }
```
