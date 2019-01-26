-- Schema
DROP DATABASE IF EXISTS pizza_recipe_db;

CREATE DATABASE pizza_recipe_db;

USE pizza_recipe_db;

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS recipe;

CREATE TABLE recipe
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    recipe VARCHAR(255),
    title TEXT,
    ingredients TEXT,
    calories INT NOT NULL,
    user_id INT UNSIGNED NOT NULL REFERENCES users(id)
);