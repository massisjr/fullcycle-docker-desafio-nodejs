USE fullcycledb;

CREATE TABLE people(
       id INT PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR(60)
);

INSERT INTO people(name) VALUES("Fulano de Tal");
INSERT INTO people(name) VALUES("Jorge das Coves");
INSERT INTO people(name) VALUES("Maria das Rosas");

/* MySQL 8 does not support the new default authentication method */
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';

flush privileges;
