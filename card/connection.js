let mysql = require('mysql');

let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gd'
});

// Uncomment the connection part if you want to connect immediately upon importing
// con.connect(function(err) {
//   if (err) throw err;
//   console.log('Connected to MySQL database!');
// });

module.exports = con;
