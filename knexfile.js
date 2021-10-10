// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './api/data/users.sqlite3'
    }
  },
  "useNullAsDefault": true
};
