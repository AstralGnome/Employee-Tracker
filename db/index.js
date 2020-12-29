const connection = require("./connection");

module.exports = {
  getDepartments() {
    return connection.query(`SELECT * FROM department`);
  },

  getRoles() {
    return connection.query(`SELECT * FROM role`);
  },

  getEmployees() {
    return connection.query(`SELECT e.first_name, r.title
                            FROM employee AS e
                            LEFT JOIN role AS r
                            ON e.role_id = r.id
                            LEFT JOIN employee AS e2
                            ON `);
  },

  insertRole(data) {
    return connection.query(`INSERT INTO role ?`, data);
  },
};

// getAll(table) {
//   return connection.query("SELECT * FROM ??", table);
// },

// getDepartments() {
//   return this.getAll("department");
// },

// getRoles() {
//   return this.getAll("role");
// },

// getEmployees() {
//   return this.getAll("employee");
// },
