const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Iwytfmoms87!",
  database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    start()
})


//ask questions about the user wants to do
function start() {
    inquirer
      .prompt({
        name: "whatNext",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add departments", "Add employees", "Add roles", "View departments", "View roles", "View employees", "Update employee roles"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.whatNext === "Add departments") {
          addDepartments();
        }
        else if(answer.whatNext === "Add employees") {
          addEmployees();
        }
        else if(answer.whatNext === "Add roles") {
            addRoles();
        }
        else if(answer.whatNext === "View departments") {
            viewDepartments();
        }
        else if(answer.whatNext === "View roles") {
            viewRoles();
        }
        else if(answer.whatNext === "View employees") {
            viewEmployees();
        }
        else if(answer.whatNext === "Update employee roles") {
            updateEmployeeRoles();
        }
        else{
          connection.end();
        }
      });
  }

//add departments
function addDepartments(){
    inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What department would you like to add?"
      },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was added successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

//add roles
function addRoles(){

}
//add employees
function addEmployees(){

}
//view departments
function viewDepartments(){

}
//view roles
function viewRoles(){

}
//view employees
function viewEmployees(){

}
//update employee roles
function updateEmployeeRoles(){

}