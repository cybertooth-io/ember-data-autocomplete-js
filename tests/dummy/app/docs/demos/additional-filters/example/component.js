import Component from '@ember/component';
import { action } from '@ember/object';

export default class Example extends Component {
  @action
  chooseUser(event, user) {
    alert(`${user.firstName}'s birth date is ${user.dateOfBirth.toISOString()}`);
    return true;
  }

  suggestionCustomized(user) {
    return `<p>${user.fullName}<br><small>Is Active? ${user.active}</small></p>`;
  }
}
