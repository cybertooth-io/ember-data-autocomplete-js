import Model, { attr } from '@ember-data/model';

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

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
