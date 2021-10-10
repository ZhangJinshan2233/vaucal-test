const BaseService = require('./base');
const knex = require('./knex');
class UserService extends BaseService {
  constructor(props = 'users') {
    super(props);
    this.table = props;
  }
  getUserByEmail(email) {
    return knex(this.table)
      .first()
      .where('email', email);
  };
  signIn(email, password) {
    return knex(this.table).where({
      email,
      password
    })
    .first()
  }
}

module.exports = new UserService();