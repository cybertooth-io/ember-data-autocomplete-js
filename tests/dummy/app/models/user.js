import DS from 'ember-data';
import { computed } from '@ember/object'

const { attr, Model } = DS;

export default class UserModel extends Model {

  /** Attributes
   ------------------------------------------------------------------------------------------------------------------ */

  @attr('boolean') active;
  @attr('date') dateOfBirth;
  @attr email;
  @attr firstName;
  @attr lastName;

  /** Computed
   ------------------------------------------------------------------------------------------------------------------ */

  @computed('firstName', 'lastName') get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
