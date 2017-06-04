const Bluebird = require('bluebird')

exports.up = (knex, Bluebird) => {
  return knex.schema.createTableIfNotExists('twitter_post', (table) => {
    table.increments('id');
    table.bigInteger('twitter_user_id').unsigned();
    table.foreign('twitter_user_id').references('id').inTable('twitter_user');
    table.bigInteger('post_id');
    table.text('text');
    table.boolean('is_reply');
    table.bigInteger('re_status_id');
    table.bigInteger('re_network_user_id');
    table.string('re_username');
    table.timestamp('posted_at');
    table.timestamps(true,true);
    table.boolean('deleted').defaultTo(false);
    table.timestamp('deleted_at');
  })
};

exports.down = (knex, Bluebird) =>
  knex.schema.dropTable('twitter_post');
