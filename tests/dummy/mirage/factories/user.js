import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({

  active() {
    // return true;
    return faker.random.boolean();
  },

  dateOfBirth() {
    return faker.date.past();
  },

  email() {
    return faker.internet.email();
  },

  firstName() {
    return faker.name.firstName();
  },

  lastName() {
    return faker.name.lastName();
  }
});
