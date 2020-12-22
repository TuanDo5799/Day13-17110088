CREATE TABLE employers (
id int not null auto_increment key,
name VARCHAR(64) not null,
notes VARCHAR(2048),
status VARCHAR(16),
contact_person VARCHAR(64),
website VARCHAR(128),
email VARCHAR(64),
phone VARCHAR(16),
address VARCHAR(64)
);
