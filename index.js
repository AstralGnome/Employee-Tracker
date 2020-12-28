const inquirer = require("inquirer");
const db = require("./db");
const connection = require("./db/connection");

function askForAction() {
  inquirer
    .prompt({
      message: "What would you like to do?",
      name: "initialAction",
      type: "list",
      choices: [
        "VIEW_DEPARTMENTS",
        "VIEW_ROLES",
        "VIEW_EMPLOYEES",
        "ADD_DEPARTMENTS",
        "ADD_ROLES",
        "ADD_EMPLOYEES",
        "UPDATE_EMPLOYEE_ROLES",
        "QUIT",
      ],
    })
    .then(() => {
      switch (res.action) {
        case "VIEW_DEPARTMENTS":
          viewDepartments();
          break;

        case "VIEW_ROLES":
          viewRoles();
          break;

        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;

        default:
          connection.end();
      }
    });
}

function viewDepartments() {
  db.getDepartments().then((results) => {
    console.table(results);
  });
}

function viewRoles() {
  db.getRoles().then((results) => {
    console.table(results);
  });
}

function viewEmployees() {
  db.getEmployees().then((results) => {
    console.table(results);
  });
}

// askForAction();
