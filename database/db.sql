--create database
CREATE DATABASE users_list;

-- use database
USE users_list;

-- create table
CREATE TABLE users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

--show tables
SHOW TABLES;

-- discribe tables
DESCRIBE users;
