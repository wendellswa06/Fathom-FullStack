var mysql = require("mysql2");

var connection = mysql.createConnection({
  connectionLimit: 10,
  host: "db-mysql-fathom-do-user-8582189-0.b.db.ondigitalocean.com",
  port: "25060",
  user: "doadmin",
  password: "r8rqi9u0ob5clf9g",
  database: "fathom",
});

// var connection = mysql.createConnection({
//   connectionLimit: 10,
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   password: "",
//   database: "fathom",
// });

module.exports = connection;
