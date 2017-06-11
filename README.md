# js-middle-child
**Discover Finance Hints Through Social Media & Stock Data**

## Getting Started:

- `brew install postgres`         _Install Postgres through Brew_
- `brew services start postgres`  _Start Postgres via Brew_
- `make full-install`             _Setup and Populate Database_

After these steps are completed you will have a database populated with
top finance figures on Twitter (as suggested by Business Insider) and 150 recent
posts from each. For an example of data pertaining to more specific financial
analysis, 2+ years of stock pricing information for 7 selected companies will be
inserted into the database as well.

All of the information described above is available via API for easy integration
with applications designed for data analysis. Examples of API
interactions are shown below.

## API Server:

Launch server with `make server`

API returns results as a JSON array of objects. Example:

**Get Stock Price History**
```javascript
// http://localhost:3300/history/aray

[
  { id: 1,
   stock_ticket_id: "1",
   date: "2015-01-02T00:00:00.000-08:00",
   open: "7.60",
   high: "7.62",
   low: "7.13",
   close: "7.21",
   volume: "1460693",
   created_at: "2017-06-07T16:38:35.556Z",
   updated_at: "2017-06-07T16:38:35.556Z",
   deleted: false,
   deleted_at: null,
   symbol: "ARAY",
   exchange: "NASDAQ",
   company: null
  },
 ...
]
```

**Get Twitter User Information**
```javascript
// http://localhost:3300/twitter_user/username/goldmansachs

[
  { id: 7,
   network_id: "253167239",
   username: "GoldmanSachs",
   first_name: "Goldman",
   last_name: "Sachs",
   description: "Official Goldman Sachs Twitter account. Follow us ...",
   location: "New York, NY",
   followers_count: 617916,
   friends_count: 105,
   account_created_at: "2011-02-16T17:59:09.000Z",
   profile_image_url: "http://pbs.twimg.com/profile_images/465954359583322112/mvHVOgH8_normal.jpeg",
   verified: true,
   created_at: "2017-06-07T16:38:23.855Z",
   updated_at: "2017-06-07T16:38:23.855Z",
   deleted: false,
   deleted_at: null
 }
]
```

**User Twitter User Id to Get Post History**
```javascript
// http://localhost:3300/twitter_user/7/posts

[
  { id: 901,
    twitter_user_id: "7",
    post_id: "872491141941297200",
    text: "Today’s $GS 2017 Charity Forum explored how investing can ...",
    is_reply: false,
    re_status_id: null,
    re_network_user_id: null,
    re_username: null,
    posted_at: "2017-06-07T16:31:12.000Z",
    created_at: "2017-06-07T16:38:34.763Z",
    updated_at: "2017-06-07T16:38:34.763Z",
    deleted: false,
    deleted_at: null
  },
  ...
]
```



## Additional Configuration:

**Environment Variables:**

The following environment variables must be set in order for this application to
operate correctly. This includes the initial seeding of data and certain tests.

The following should be set in your `.env` file:

- `TWITTER_CONSUMER_API_KEY`
- `TWITTER_CONSUMER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_TOKEN_SECRET`

- `POSTGRES_USER`
- `POSTGRES_MAIN_DB`
- `POSTGRES_PW`
- `POSTGRES_PORT`
- `POSTGRES_HOST`

**DB Config with knexfile:**

A `knexfile.js` should be created in order to establish default database configurations

```javascript
// knexfile.js

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'development_data',
      port: 5432,
      user: 'User',
      host: 'localhost',
      password: ''
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'production_data',
      port: 5432,
      user: 'User',
      host: 'localhost',
      password: 'amazing_password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
```

> **NOTE** App uses Google Finance - now deprecated, but still functional.
This project is intended to be, and has evolved as, a thought exercise.
All stock information is intended for personal & non-commercial use.
