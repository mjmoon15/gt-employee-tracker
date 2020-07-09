const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Iwytfmoms87!",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

//ask questions about what the user wants to do
function start() {
  inquirer
    .prompt({
      name: "whatNext",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add departments",
        "Add roles",
        "Add employees",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
      ],
    })
    .then(function (answer) {
      // based on their answer, move to next function
      if (answer.whatNext === "Add departments") {
        addDepartments();
      } else if (answer.whatNext === "Add employees") {
        addEmployees();
      } else if (answer.whatNext === "Add roles") {
        addRoles();
      } else if (answer.whatNext === "View departments") {
        viewDepartments();
      } else if (answer.whatNext === "View roles") {
        viewRoles();
      } else if (answer.whatNext === "View employees") {
        viewEmployees();
      } else if (answer.whatNext === "Update employee roles") {
        updateEmployeeRoles();
      } else {
        connection.end();
      }
    });
}

//add departments
function addDepartments() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was added successfully!");
          // re-prompt the user to choose from possible actions
          start();
        }
      );
    });
}

//add roles
function addRoles() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What role would you like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What salary will the new role have?",
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the new role's department ID number?",
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Your role was added successfully!");
          // re-prompt the user to choose from possible actions
          start();
        }
      );
    });
}
//add employees
function addEmployees() {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is the new employee's first name?",
      },
      {
        name: "last",
        type: "input",
        message: "What is the new employee's last name?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the new employee's role ID?",
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the new employee's manager's ID, if applicable?",
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first,
          last_name: answer.last,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Your new employee was added successfully!");
          // re-prompt the user to choose from possible actions
          start();
        }
      );
    });
}
//view departments
function viewDepartments() {
  console.log("Viewing all departments...\n");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}
//view roles
function viewRoles() {
    console.log("Viewing all roles...\n");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}
//view employees
function viewEmployees() {
    console.log("Viewing all employees...\n");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}
//update employee roles
function updateEmployeeRoles() {}
