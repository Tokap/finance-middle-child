Bluebird = require('bluebird')


exports.up = (knex, Bluebird) => {
  return knex.schema.createTableIfNotExists('twitter_user', (table) => {
    table.increments('id');
    table.string('username');
    table.string('first_name');
    table.string('last_name');
    table.text('description');
    table.string('location');
    table.integer('network_id');
    table.integer('followers_count');
    table.integer('friends_count');
    table.integer('account_created_at');
    table.integer('profile_image_url');
    table.boolean('verified');
    table.timestamps();
    table.boolean('deleted');
    table.timestamp('deleted_at');
  })
};

exports.down = (knex, Bluebird) => {
  return knex.schema.dropTable('twitter_user');
};
