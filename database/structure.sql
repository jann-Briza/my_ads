
CREATE DATABASE my_ads
CREATE EXTENSION pgcrypto;


CREATE TABLE category(id SERIAL, name TEXT);

INSERT INTO category(name) values ('Jobs');
INSERT INTO category(name) values ('Cars');
INSERT INTO category(name) values ('Phones');
INSERT INTO category(name) values ('Electronics');
INSERT INTO category(name) values ('Fitness');
INSERT INTO category(name) values ('Furniture');
INSERT INTO category(name) values ('Appliances');
INSERT INTO category(name) values ('Websites');
INSERT INTO category(name) values ('Cooking');
INSERT INTO category(name) values ('Dogs');


CREATE TABLE advertisement(
    id SERIAL PRIMARY KEY,
    key TEXT,
    title TEXT,
    description TEXT,
    category_id TEXT,
    created_by_id INT
);


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT NOT NULL,
    name TEXT
);

INSERT INTO users (username, name, password) VALUES (
  'admin',
  current_timestamp,
  crypt('adminpassword', gen_salt('bf'))
);
