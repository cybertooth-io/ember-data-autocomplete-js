import DS from 'ember-data';
import { attr } from '@ember-decorators/data';
import { computed } from '@ember-decorators/object'

const { Model } = DS;

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

  @computed('firstName', 'lastName') fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
