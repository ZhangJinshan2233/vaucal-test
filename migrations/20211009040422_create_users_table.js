
exports.up = function(knex) {
   return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('firstName',100)
        .notNullable();
        table.string('lastName',100);
        table.string('email',150)
        .notNullable();
        table.string('password')
        .notNullable();
        table.boolean('isAdmin')
        .notNullable()
        .defaultTo(0)
      })
};

exports.down = function(knex) {
  return knex.schema,dropTableIfExists('users')
};
