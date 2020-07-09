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
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)
    -- FOREIGN KEY (manager_id) REFERENCES employee(manager_id)
);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

INSERT INTO department (name)
VALUES ("IT"), ("Sanitation"), ("Marketing"), ("Production");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100, 1), ("Engineer", 90, 2), ("Intern", 30, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, 1), ("Jane", "Doe", 2, 1), ("Steve", "Doug", 3 ,1); 


