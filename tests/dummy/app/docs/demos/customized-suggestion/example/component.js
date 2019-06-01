import { action } from '@ember/object';
import Component from '@ember/component';

export default class Example extends Component {
  @action
  chooseUser(event, user) {
    alert(`${user.firstName}'s birth date is ${user.dateOfBirth.toISOString()}`);
    return true;
  }

  suggestionCustomized(user) {
    return `<p>${user.fullName} - ${user.email}<br/><small>DOB: ${user.dateOfBirth.toLocaleString()}</small></p>`;
  }
}
