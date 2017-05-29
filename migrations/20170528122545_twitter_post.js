Bluebird = require('bluebird')

exports.up = (knex, Bluebird) => {
  return knex.schema.createTableIfNotExists('twitter_post', (table) => {
    table.increments('id');
    table.biginteger('twitter_user_id').unsigned();
    table.foreign('twitter_user_id').references('id').inTable('twitter_user')
    table.string('post');
    table.string('tone');
    table.timestamps();
    table.boolean('deleted');
    table.timestamp('deleted_at');
  })
};

exports.down = (knex, Bluebird) =>
  knex.schema.dropTable('twitter_post');
