DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT AUTO INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT AUTO INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT, 
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT AUTO INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);


