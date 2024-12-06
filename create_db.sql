# Create database script for In Tune With Music Theory

# Create the database
CREATE DATABASE IF NOT EXISTS music_theory_app;
USE music_theory_app;

# Create the tables
CREATE TABLE IF NOT EXISTS topics (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50));

CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT,
    answer TEXT,
    topic_id INT,
    FOREIGN KEY (topic_id) REFERENCES topics(id)
);

CREATE USER IF NOT EXISTS 'app_user'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON music_theory_app.* TO 'app_user'@'localhost';
