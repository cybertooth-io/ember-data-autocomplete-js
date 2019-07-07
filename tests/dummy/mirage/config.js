import { isPresent } from '@ember/utils';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.4.x/shorthands/
  */

  this.passthrough();

  this.get('/users', (schema, request) => {
    let users = schema.users.all();

    const byActive = request.queryParams['filter[by_active]'];
    if (isPresent(byActive)) {
      const byActiveBoolean = byActive === 'true';
      users = users.filter(user => user.active === byActiveBoolean);
    }

    const byNameSearchValue = request.queryParams['filter[by_name_search]'];
    if (isPresent(byNameSearchValue)) {
      const regExpPattern = `.*${byNameSearchValue}.*`;
      users = users.filter(user => {
        return `${user.firstName} ${user.lastName}`.match(new RegExp(regExpPattern, 'gi'));
      });
    }

    const pageSize = request.queryParams['page[size]'];
    if (isPresent(pageSize)) {
      users = users.slice(0, pageSize);
    }

    return users;
  });

}
