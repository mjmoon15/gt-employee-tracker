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
        "View all",
        "Update employee roles",
        "Delete departments",
        "Delete roles",
        "Exit",
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
      } else if (answer.whatNext === "View all") {
        viewAll();
      } else if (answer.whatNext === "Update employee roles") {
        updateEmployeeRoles();
      } else if (answer.whatNext === "Delete departments") {
        deleteDepartments();
      } else if (answer.whatNext === "Delete roles") {
        deleteRoles();
      } else if (answer.whatNext === "Delete employees") {
        deleteRoles();
      } else if (answer.whatNext === "Exit") {
        connection.end();
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
        message: "What is the new employee's manager's ID?",
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
  connection.query("SELECT * FROM role ORDER BY salary DESC", function (
    err,
    res
  ) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}
//view employees
function viewEmployees() {
  console.log("Viewing all employees...\n");
  connection.query("SELECT * FROM employee ORDER BY last_name ASC", function (
    err,
    res
  ) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}
//view all the things
function viewAll() {
  console.log("Viewing all the things...\n");
  connection.query(
    "SELECT employee.id, first_name, last_name, title, name as department_name, manager_id, salary FROM role JOIN department ON role.department_id = department.id Right JOIN employee ON role.id=employee.role_id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}
//update employee roles
function updateEmployeeRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    console.log("Updating roles...\n");
    const roleArray = res.map((item) => item.title);
    inquirer
      .prompt([
        {
          name: "role_id",
          type: "list",
          message: "What employee role would you like to update?",
          choices: roleArray,
        },
      ])
      .then(function (answer) {
        console.log("Selected employee", answer);
        let selectedRoleId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].title === answer.role_id) {
            selectedRoleId = res[i];
          }
          console.log("selected role ID ", selectedRoleId.id);
          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [selectedRoleId.id, answer.name],
            function (err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " role updated!\n");
              // go back to where it all started
              start();
            }
          );
        }
      });
  });
}
//delete departments
function deleteDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    const departmentArray = res.map((item) => item.name);
    inquirer
      .prompt([
        {
          name: "name",
          type: "list",
          message: "Which department would you like to delete?",
          choices: departmentArray,
        },
      ])
      .then(function (answer) {
        let selectedDepartmentId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].name === answer.name) {
            selectedDepartmentId = res[i];
          }
        }
        const { id } = selectedDepartmentId;
        connection.query("Delete FROM department WHERE id = ?", [id], function (
          err,
          res
        ) {
          if (err) throw err;
          console.log(res.affectedRows + " deleted department!\n");
          start();
        });
      });
  });
}

//delete roles
function deleteRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    const roleArray = res.map((item) => item.name);
    inquirer
      .prompt([
        {
          name: "name",
          type: "list",
          message: "Which role would you like to delete?",
          choices: roleArray,
        },
      ])
      .then(function (answer) {
        console.log("role to delete", answer);
        let selectedRoleId = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].name === answer.name) {
            selectedRoleId = res[i];
          }
        }
        const { id } = selectedRoleId;
        connection.query("Delete FROM role WHERE id = ?", [id], function (
          err,
          res
        ) {
          if (err) throw err;
          console.log(res.affectedRows + " deleted role!\n");
          start();
        });
      })
      .catch(function(err){
          console.log(err)
      })
  });
}
