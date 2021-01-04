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
      //You CAN make it so that the schema accepts unique names only.
      .then(function (answer) {
        let newDepName = [];
        for (let i = 0; i < results.length; i++) {
          newDepName.push(results[i].name);
        }
        if (!newDepName.includes(answer.newDepartment)) {
          connection.query(
            `INSERT INTO department SET ?`,
            {
              name: answer.newDepartment,
            },
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
      .prompt([
        {
          message: "Create a name for the new position.",
          name: "newRole",
          type: "input",
        },
        {
          message: "Choose a salary amount for the new position.",
          name: "chosenSal",
          type: "input",
        },
        {
          message: "Choose a department for the new position.",
          name: "depId",
          type: "input",
        },
      ])
      .then(function (answer) {
        let newRoleName = [];
        for (let i = 0; i < results.length; i++) {
          newRoleName.push(results[i].title);
        }
        if (!newRoleName.includes(answer.newRole)) {
          connection.query(
            `INSERT INTO role SET ?`,
            {
              // add inquirer questions for salary and department_id
              title: answer.newRole,
              salary: answer.chosenSal,
              department_id: answer.depId,
            },
            function (err) {
              if (err) throw err;
              console.log("\n You successfully added a new role! \n");
              viewRoles();
            }
          );
        } else {
          console.log("\n You UNsuccessfully added a new role! \n");
          viewRoles();
        }
      });
  });
}
function addEmployee() {
  db.getRoles().then((roles) => {
    const titleOptions = [];
    for (let i = 0; i < roles.length; i++) {
      titleOptions.push(`${roles[i].title} ${roles[i].id}`);
    }
    db.getEmployees().then((employees) => {
      const manOptions = [];
      for (let i = 0; i < employees.length; i++) {
        manOptions.push(`${employees[i].first_name} ${employees[i].last_name} ${employees[i].id}`);
      }

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
          {
            message: "Choose the new employee's job tile.",
            name: "chosenRoleId",
            type: "list",
            choices: titleOptions,
          },
          {
            message: "Choose a manager for the new employee.",
            name: "chosenMana",
            type: "list",
            choices: manOptions,
          },
        ])
        .then(function (answer) {
          const roley = answer.chosenRoleId.split(" ");
          const managery = answer.chosenMana.split(" ");
          connection.query(
            `INSERT INTO employee SET ?`,
            {
              first_name: answer.newFirst,
              last_name: answer.newLast,
              role_id: roley[roley.length - 1],
              manager_id: managery[managery.length - 1],
            },
            function (err) {
              if (err) throw err;
              console.log("\n You successfully added a new employee! \n");
              viewEmployees();
            }
          );
        });
    });
  });
}

function updateEmployeeRole() {}

askForAction();

// .then(function (answer) {
//   connection.query(`INSERT INTO employee SET ?`, {
//     first_name: answer.newFirst,
//     last_name: answer.newLast,
//   });
// });

// .then(function (answer) {
//   connection.query(`INSERT INTO role SET ?`, {
//     title: answer.titleOptions,
//     salary: answer.ChosenSal,
//   });
// });
// });

// db.getDepartments().then((departments) => {
// const depOptions = departments.map((department) => ({
// value: department.id,
// name: department.name,
// }));
