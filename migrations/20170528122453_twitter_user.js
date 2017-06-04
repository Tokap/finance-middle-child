const Bluebird = require('bluebird')

exports.up = (knex, Bluebird) => {
  return knex.schema.createTableIfNotExists('twitter_user', (table) => {
    table.increments('id');
    table.bigInteger('network_id');
    table.string('username');
    table.string('first_name');
    table.string('last_name');
    table.text('description');
    table.string('location');
    table.integer('followers_count');
    table.integer('friends_count');
    table.timestamp('account_created_at');
    table.string('profile_image_url');
    table.boolean('verified');
    table.timestamps(true,true);
    table.boolean('deleted').defaultTo(false);
    table.timestamp('deleted_at');
  })
};

exports.down = (knex, Bluebird) =>
  knex.schema.dropTable('twitter_user');
