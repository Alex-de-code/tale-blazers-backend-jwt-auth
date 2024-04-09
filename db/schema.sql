-- db/schema.sql
DROP DATABASE IF EXISTS jwt_auth;

CREATE DATABASE jwt_auth;


\c jwt_auth


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE story_beginnings (
    id SERIAL PRIMARY KEY,
    account_id integer, 
    title VARCHAR(200), 
    genre VARCHAR(50),
    description VARCHAR(255), 
    body text 
); 

CREATE TABLE story_endings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200), 
    body text, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    story_beginnings_id integer,
    account_id integer
); 


