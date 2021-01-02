const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db");
const connection = require("./db/connection");

const logo = require("asciiart-logo");
console.log(
  logo({
    name: "Employee Tracker",
    font: "Cybermedium",
    lineChars: 10,
    padding: 2,
    margin: 3,
    borderColor: "bold-magenta",
    logoColor: "bold-cyan",
    textColor: "white",
  })
    .emptyLine()
    .right("V 0.1")
    .emptyLine()
    .left("Now you can monitor, alter, and replace employees, like cogs in a machine.")
    .render()
);

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
        "ADD_DEPARTMENT",
        "ADD_ROLE",
        "ADD_EMPLOYEE",
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

        case "ADD_DEPARTMENT":
          addDepartment();
          break;

        case "ADD_ROLE":
          addRole();
          break;

        case "ADD_EMPLOYEE":
          addEmployee();
          break;

        case "UPDATE_EMPLOYEE_ROLES":
          updateEmployeeRole();
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
    let deptTable = cTable.getTable(results);
    console.log(deptTable);
    askForAction();
  });
}

function viewRoles() {
  db.getRoles().then((results) => {
    let roleTable = cTable.getTable(results);
    console.log(roleTable);
    askForAction();
  });
}

function viewEmployees() {
  db.getEmployees().then((results) => {
    let empTable = cTable.getTable(results);
    console.log(empTable);
    askForAction();
  });
}

function addDepartment() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt({
        message: "Create a name for the new department.",
        name: "newDepartment",
        type: "input",
      })
      .then(function (answer) {
        let newDepName = [];
        for (let i = 0; i < results.length; i++) {
          newDepName.push(results[i].name);
        }
        if (!newDepName.includes(answer.newDepartment)) {
          connection.query(
            `INSERT INTO department SET ?`,
            { name: answer.newDepartment },
            function (err) {
              if (err) throw err;
              console.log("\n You successfully added a new department! \n");
              viewDepartments();
            }
          );
        } else {
          console.log("\n You UNsuccessfully added a new department! \n");
          viewDepartments();
        }
      });
  });
}
function addRole() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt({
        message: "Create a name for the new Role.",
        name: "newRole",
        type: "input",
      })
      .then(function (answer) {
        let newRoleName = [];
        for (let i = 0; i < results.length; i++) {
          newRoleName.push(results[i].title);
        }
        if (!newRoleName.includes(answer.newRole)) {
          connection.query(`INSERT INTO role SET ?`, { title: answer.newRole }, function (err) {
            if (err) throw err;
            console.log("\n You successfully added a new role! \n");
            viewRoles();
          });
        } else {
          console.log("\n You UNsuccessfully added a new role! \n");
          viewRoles();
        }
      });
  });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        message: "Enter the new employee's first name.",
        name: "newFirst",
        type: "input",
      },
      {
        message: "Enter the new employee's last name.",
        name: "newLast",
        type: "input",
      },
    ])
    .then(function (answer) {
      connection.query(
        `INSERT INTO employee SET ?`,
        {
          first_name: answer.newFirst,
          last_name: answer.newLast,
        },
        function (err) {
          if (err) throw err;
          console.log("\n You successfully added a new employee! \n");
          viewEmployees();
        }
      );
    });
}

function updateEmployeeRole() {}

askForAction();
