import { action } from '@ember/object';
import Component from '@ember/component';

export default class Example extends Component {
  @action
  chooseUser(event, user) {
    alert(`${user.firstName}'s birth date is ${user.dateOfBirth.toISOString()}`);
    return true;
  }
}
