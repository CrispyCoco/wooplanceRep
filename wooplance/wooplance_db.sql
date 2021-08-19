DROP DATABASE IF EXISTS wooplance_db;
CREATE DATABASE wooplance_db;
USE wooplance_db;

CREATE TABLE users (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(250),
last_name VARCHAR(250),
username VARCHAR(250) unique,
email VARCHAR(250) unique,
password VARCHAR(250),
profile_pic varchar(250),
description varchar(500),
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
category varchar(150)
);

CREATE TABLE gigs(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
gig VARCHAR(250),
description VARCHAR(250),
specs VARCHAR(1000),
cover varchar(250),
price_min INT unsigned,
price_max INT UNSIGNED,
category_id INT UNSIGNED,
freelancer_id INT UNSIGNED,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(category_id) REFERENCES categories (id) ON DELETE CASCADE,
FOREIGN KEY(freelancer_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE pending_gigs(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
gig VARCHAR(250),
description VARCHAR(250),
specs VARCHAR(1000),
cover varchar(250),
price_min INT unsigned,
price_max INT UNSIGNED,
category_id INT UNSIGNED,
done bool DEFAULT FALSE,
freelancer_id INT UNSIGNED,
employer_id INT UNSIGNED,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(category_id) REFERENCES categories (id) ON DELETE CASCADE,
FOREIGN KEY(freelancer_id) REFERENCES users (id) ON DELETE CASCADE,
FOREIGN KEY(employer_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE comments(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
comment VARCHAR(250),
user_id INT UNSIGNED,
gig_id INT UNSIGNED,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE,
FOREIGN KEY(gig_id) REFERENCES gigs (id) ON DELETE CASCADE
);

CREATE TABLE ratings(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
user_id INT UNSIGNED,
gig_id INT UNSIGNED,
FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE,
FOREIGN KEY(gig_id) REFERENCES gigs (id) ON DELETE CASCADE
);


INSERT INTO users values 
(default, 'Joaquin', 'Gomez Rodriguez', 'JGomez', 'joaquin@gmail.com', '1234', '/images/users/default-user.png', 'Soy dessarrollador fullstack con experiencia en JavaScript y Node Js', default, default),
(default, 'Milton', 'Kienigiel', 'milton_ki', 'miltonki@gmail.com', '4321', '/images/users/default-user.png', 'Soy traductor y hago doblaje', default, default),
(default, 'Pedro', 'Gonzalez', 'p_gonzalez', 'pedro@gmail.com', '1111', '/images/users/default-user.png', 'Soy diseñador UI/UX uso Figma y Adobe XD para el desarrollo', default, default),
(default, 'Martina Laura', 'Lopez', 'martu_lz', 'Mlopez@gmail.com', '2222', '/images/users/default-user.png', 'Soy estudiante de marketing en UADE, con pasantias hechas en Google y Coca Cola', default, default),
(default, 'Sofia', 'Rossi', 'sofirossi_', 'rossisofia1997@gmail.com', 'contraseña', '/images/users/default-user.png', 'Soy música de peliculas y series. Hice varias publicidades', default, default),
(default, 'Andres', 'Silva', 'andres.sil', 'a.silva@gmail.com', 'miperro', '/images/users/default-user.png', 'Soy ingeniero industrial egresado de UTN, buscando trabajos simples aparte de mi trabajo de dependencia', default, default),
(default, 'Tomas', 'Luccetti', 'tomasL', 'tluccetti@gmail.com', '2444', '/images/users/default-user.png', 'Soy diseñador gráfico graduado de la UBA, tengo especializacion en animaciones', default, default);

INSERT INTO categories VALUES
(default, 'Programación y Tecnología'),
(default, 'Redacción y Traducción'),
(default, 'Diseño y Multimedia'),
(default, 'Video y Animación'),
(default, 'Marketing y Negocios'),
(default, 'Música y Sonido'),
(default, 'Ingeniería y Arquitectura');

INSERT INTO gigs VALUES
(default, 'Desarrollo de Landing Pages', 'Hago landings con o sin diseño previo hasta de 4 pantallas', 'Sin diseño: $300. Con hosteo: $500. Una pantalla: $1000. Cada pantalla extra: $700', '/images/gigs/default-image.png', 1000, 3900, 1, 1, default, default);