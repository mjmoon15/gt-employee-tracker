DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT, 
    PRIMARY KEY (id)
    -- FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
    -- FOREIGN KEY (role_id) REFERENCES role(id)
    -- FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

INSERT INTO department (name)
VALUES ("IT"), ("Sanitation"), ("Marketing"), ("Production");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100, 1), ("Engineer", 90, 2), ("Intern", 30, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sleve", "McDichael", 1, null), ("Onson", "Sweemey", 2, 1), ("Darryl", "Archideld", 3, 1), ("Anatoli", "Smorin", 4, 1), ("Rey", "Mcsriff", 5, 1), ("Glenallen", "Mixon", 6, 1), ("Mario", "McAlwain", 7, 1), ("Raul", "Chamgerlain", 8, 2), ("Kevin", "Nogilny", 9, 2), ("Tony", "Smehrik", 10, 2), ("Bobson", "Dugnutt", 11, 2); 

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name
FROM employee
INNER JOIN role ON (role.id = employee.role_id)
INNER JOIN department ON (department.id = role.department_id);

SELECT employee.id, first_name, last_name, title, name as department_name, manager_id, salary 
FROM role 
JOIN department ON role.department_id = department.id 
Right JOIN employee ON role.id = employee.role_id;