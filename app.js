var express = require('express')
var app = express()
var graphqlHTTP = require('express-graphql');
var path = require('path')
var schema = require('./graphql/schema.js');



// --- test
// var { buildSchema } = require('graphql');
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);
// var root = { hello: () => 'Hello world!' };
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
 // --- end of test

var html_dir = path.join(__dirname, 'html')

// serving static files
app.use(express.static('build'))

// demo page
app.get('/', function(req, res) {
  res.sendFile(html_dir + '/live_search.html')
})

// handle GraphQL request
app.use('/graphql', graphqlHTTP({
  schema: schema,

  graphiql: true,
}));

// Error 404
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
