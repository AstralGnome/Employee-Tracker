const inquirer = require("inquirer");
require("console.table");
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
    .then((res) => {
      switch (res.initialAction) {
        case "VIEW_DEPARTMENTS":
          viewDepartments();
          break;

        case "VIEW_ROLES":
          viewRoles();
          break;

        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;

        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;

        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;

        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;

        case "QUIT":
          connection.end();
          break;

        default:
          connection.end();
      }
    });
}

//The ".thens" below are only possible because we used PROMISIFY the query object in connection.js
function viewDepartments() {
  db.getDepartments().then((results) => {
    console.table(results);
    askForAction();
  });
}

function viewRoles() {
  db.getRoles().then((results) => {
    console.table(results);
    askForAction();
  });
}

function viewEmployees() {
  db.getEmployees().then((results) => {
    console.table(results);
    askForAction();
  });
}

askForAction();
