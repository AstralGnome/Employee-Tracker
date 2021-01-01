const connection = require("./connection");

module.exports = {
  getDepartments() {
    return connection.query(`SELECT name FROM department`);
  },

  getRoles() {
    return connection.query(`SELECT role FROM role`);
  },

  getEmployees() {
    return connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS 'department', r.salary, CONCAT (e.first_name," ",e.last_name) AS 'manager'
                            FROM employee AS e
                            LEFT JOIN role AS r
                            ON e.role_id = r.id
                            LEFT JOIN employee
                            ON e.manager_id = e.id
                            LEFT JOIN department AS d
                            ON e.role_id = d.id`);
  },

  // addDepartment(answer) {
  //   return connection.query(
  //     `INSERT INTO role SET ?`,
  //     { newDepartment: answer.addDepInput },
  //       console.log("Department added successfully!")
  //   );
  // },
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
