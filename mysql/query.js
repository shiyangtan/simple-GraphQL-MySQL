
let query = (search_term) => {
  console.log(search_term);
  var promise = new Promise((resolve, reject) => {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'newuser',
      password : 'password',
      database : 'america_major_cities',
      port     : '8889'
    });

    connection.connect();
    console.log('Connect to MySQL successfully');

  // `CALL get_cities_by_keyword(${search_term})`
  // SELECT * FROM cities LIMIT 10

    connection.query(`CALL get_cities_by_keyword("${search_term}")`, function (error, results, fields) {
      if (error) throw error;

      resolve(results[0]);
    });

    connection.end();
  });

  return promise;
};

module.exports = query;
