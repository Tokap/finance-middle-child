const Bluebird = require('bluebird')

exports.up = (knex, Bluebird) => {
  return knex.schema.createTableIfNotExists('stock_pricing', (table) => {
    table.increments('id');
    table.bigInteger('stock_ticket_id').unsigned();
    table.foreign('stock_ticket_id').references('id').inTable('stock_ticket');
    table.string('date'); //change to timestamp?
    table.decimal('open');
    table.decimal('high');
    table.decimal('low');
    table.decimal('close');
    table.bigInteger('volume');
    table.timestamps(true,true);
    table.boolean('deleted').defaultTo(false);
    table.timestamp('deleted_at');
  })
};

exports.down = (knex, Bluebird) =>
  knex.schema.dropTable('stock_pricing');
