const Postgres = require('pg-promise')();

const db = Postgres(conn);

// return db.one('SELECT * FROM test_table')
// .then( (rez) => console.log('Hey! An Outcome!', rez))
// .catch((e) => console.log('Error During DB Conn: ', e))


// Example Use of Twitter API Interaction:
let my_params = makeParams('AndreVasilescu', 1);
let my_client = makeTwitterClient();

my_client.get(STATUS_TIMELINE, my_params)
  .then( (tweets) => {
    console.log(tweets);
  })
  .catch( (error) => {
    console.log(error);
  })

// getUserDetails('AndreVasilescu', my_client)
