const connection = require("./connection");

module.exports = {
  getDepartments() {
    return connection.query(`SELECT * FROM department`);
  },

  getRoles() {
    return connection.query(`SELECT * FROM role`);
  },

  getEmployees() {
    return connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS 'department', r.salary, CONCAT (e2.first_name," ",e2.last_name) AS 'manager'
                            FROM employee AS e
                            LEFT JOIN role AS r
                            ON e.role_id = r.id
                            LEFT JOIN employee AS e2
                            ON e.manager_id = e2.id
                            LEFT JOIN department AS d
                            ON r.department_id = d.id`);
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
