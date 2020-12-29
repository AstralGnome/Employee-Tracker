const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "17AstralGnome44!",
  database: "employees",
});

//Alternative connection method below. Does not do all the cool things that promisify does.
// connection.connect((err) => {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
// });

//Setting up connection.query to use promises instead of callbacks which allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;
