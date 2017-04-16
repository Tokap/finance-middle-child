// Might Resolve Browser Origin Issues:
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


// Example Use of Twitter API Interaction:
// let my_params = makeParams('AndreVasilescu', 613, 1);
// let my_client = makeTwitterClient();
//
// my_client.get(STATUS_TIMELINE, my_params)
//   .then( (tweets) => {
//     console.log(tweets);
//   })
//   .catch( (error) => {
//     console.log(error);
//   })
