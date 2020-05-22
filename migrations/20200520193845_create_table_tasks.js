
exports.up = function(knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id').primary();
    table.string('description').notNull();
    table.datetime('estimatedDate');
    table.datetime('doneDate');
    table.integer('userId').references('id')
      .inTable('users').notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
