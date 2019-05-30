import DS from 'ember-data';
import { computed } from '@ember/object'

const { attr, Model } = DS;

export default class UserModel extends Model {

  /** Attributes
   ------------------------------------------------------------------------------------------------------------------ */

  @attr('boolean') active;
  @attr('date') dateOfBirth;
  @attr('string') email;
  @attr('string') firstName;
  @attr('string') lastName;

  /** Computed
   ------------------------------------------------------------------------------------------------------------------ */

  @computed('firstName', 'lastName') get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
