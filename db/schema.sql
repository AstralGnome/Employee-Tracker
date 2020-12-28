DROP DATABASE IF EXISTS employees CREATE database employees USE employees CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR (30) NULL,
  PRIMARY KEY (id)
);
CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR (30) Null,
  last_name VARCHAR (30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR (30) NULL,
  salary DECIMAL (10, 4) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);
SELECT
  *
FROM
  department;
SELECT
  *
FROM
  role;
SELECT
  *
FROM
  employee;