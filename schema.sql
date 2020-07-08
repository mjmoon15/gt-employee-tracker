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
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

INSERT INTO department (name)
VALUES ("IT"), ("Sanitation"), ("Marketing"), ("Production");

INSERT INTO role (title, salary)
VALUES ("Manager", "100"), ("Engineer", "90"), ("Intern", "30");

INSERT INTO employee (first_name, last_name)
VALUES ("John", "Smith"), ("Jane", "Doe"), ("Steve", "Doug"); 


