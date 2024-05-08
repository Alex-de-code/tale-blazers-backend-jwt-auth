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
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, 
    title VARCHAR(200), 
    genre VARCHAR(50),
    description VARCHAR(255), 
    body TEXT,
    is_flagged BOOLEAN, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE story_endings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200), 
    body TEXT, 
    story_beginnings_id INTEGER REFERENCES story_beginnings(id),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    is_flagged BOOLEAN, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE story_endings_comments (
    id SERIAL PRIMARY KEY, 
    story_endings_id INTEGER REFERENCES story_endings(id),
    body TEXT, 
    tag VARCHAR(50), 
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, 
    is_flagged BOOLEAN, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE story_endings_likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    story_endings_id INTEGER REFERENCES story_endings(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);