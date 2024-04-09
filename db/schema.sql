-- db/schema.sql
DROP DATABASE IF EXISTS tailblazer_db;

CREATE DATABASE tailblazer_db;


\c tailblazer_db;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    profile_picture VARCHAR(255), 
    bio TEXT, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE story_beginnings (
    id SERIAL PRIMARY KEY,
    account_id integer, 
    title VARCHAR(200), 
    genre VARCHAR(50),
    description VARCHAR(255), 
    body TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE story_endings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200), 
    body TEXT, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (story_beginnings_id) REFERENCES story_beginnings(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
); 


