-- CREATE DATABASE store_rating;

USE store_rating;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(400) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE stores (
    store_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    store_name VARCHAR(255) NOT NULL,

    CONSTRAINT fk_store_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE ratings (
    rating_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating INT NOT NULL,

    CONSTRAINT fk_rating_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_rating_store FOREIGN KEY (store_id) REFERENCES stores(store_id)
);