const Bluebird = require('bluebird')

exports.up = (knex, Bluebird) => {
  return knex.schema.createTableIfNotExists('stock_ticket', (table) => {
    table.increments('id');
    table.string('symbol');
    table.string('exchange');
    table.string('company');
    table.timestamps(true,true);
    table.boolean('deleted').defaultTo(false);
    table.timestamp('deleted_at');
  })
};

exports.down = (knex, Bluebird) =>
  knex.schema.dropTable('stock_ticket');
