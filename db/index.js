const connection = require("./connection");

module.exports = {
  getAll(table) {
    return connection.query("SELECT * FROM ??", table);
  },

  getDepartments() {
    return this.getDepartments("department");
  },

  getRoles() {
    return this.getAll("role");
  },

  getEmployees() {
    return this.getAll("employee");
  },
};
