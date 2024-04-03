const mysql = require('mysql');

// Create a connection to the MySQL database
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dimple'
});

module.exports=con;