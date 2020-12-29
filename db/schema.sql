DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees; 

USE employees;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR (30) NULL
);
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (30) NULL,
  salary DECIMAL (10, 4) NULL,
  department_id INT NULL,
  FOREIGN KEY role(department_id) REFERENCES department(id)
);
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR (30) NULL,
  last_name VARCHAR (30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  FOREIGN KEY employee(role_id) REFERENCES role(id),
  CONSTRAINT manager FOREIGN KEY employee(manager_id) REFERENCES employee(id)
);