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
rating DOUBLE unsigned,
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
rating INT UNSIGNED,
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
-- Error Code: 1064. You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'default, default), (default, 'Doblaje', 'Hago doblaje de series, peliculas y ...' at line 7

-- Prog
(default, 'Desarrollo de Landing Pages', 'Hago landings con o sin diseño previo hasta de 4 pantallas', 'Sin diseño: $300. Con hosteo: $500. Una pantalla: $1000. Cada pantalla extra: $700', '/images/gigs/default-image.png', 1000, 3900, 1, 1, 0, default, default),
(default, 'Pagina web con base de datos', 'Hago páginas con express y MySQL', 'El precio dependera de las funcionalidades que se quieran agregar. Pagina con funciones basicas representa el precio mínimo', '/images/gigs/default-image.png', 9000, 15000, 1, 1, 0, default, default),
(default, 'Desarrollo de aplicaciones mobiles', 'Desarrollo aplicaciones funcionales tanto para Android como para Apple', 'Aplicaciones de la complejidad necesaria, el precio base es una aplicacion sin guardar informacion, solo el diseño, se le puede agregar desde base de datos hasta funcionalidades mas complejas como un sistema de mensajeria o chat', '/images/gigs/default-image.png', 5000, 20000, 1, 1, 0, default, default),
-- Traducción
(default, 'Preparacion para examenes internacionales', 'Doy clases de ingles y frances para rendir los examenes internacionales de cualquier nivel', 'Las inscripciones y la organizacion no esta incluida en el precio mínimo, pero me puedo encargar de eso. La complejidad del examen hace variar el precio. El precio es por clase.', '/images/gigs/default-image.png', 1800, 3700, 2, 2, 0, default, default),
(default, 'Doblaje', 'Hago doblaje de series, peliculas y cortometrajes del portugues o ingles al castellano', 'El precio mínimo es por hora sin horarios fijos, el maximo es para un horario específico', '/images/gigs/default-image.png', 500, 1300, 2, 2, 0, default, default),
(default, 'Traducción de textos académicos', 'Traduzco textos del ingles al español, principalmente textos económicos', 'El precio mínimo es para textos de 120 páginas o menos, cada 30 páginas mas, se suman 100 pesos al valor', '/images/gigs/default-image.png', 1000, 3900, 2, 2, 0, default, default),
-- Diseño
(default, 'Diseño de logos e iconos', 'Hago logotipos para empresas e iconos para paginas web o aplicaciones', 'El precio minimo considera tres instancias de presentación de logos, en cuanto a los iconos, el precio se arregla pero el paquete de 20 iconos representa el precio maximo. Cualquier icono personalizado y extra se arregla por chat', '/images/gigs/default-image.png', 2300, 3900, 3, 3, 0, default, default),
(default, 'Diseño UI/UX de aplicaciones', 'Hago las pantallas necesarias para aplicaciones.', '4 pantallas o menos valen el precio minimo. Si se requieren mas pantallas o mas partes del diseño, se suma al precio', '/images/gigs/default-image.png', 4000, 9500, 3, 3, 0, default, default),
(default, 'Diseño de interiores', 'Hago diseño practico y economico para departamentos de todos los tamaños', 'El precio minimo es para un monoambiente, el maximo es para uno de 4 ambientes. Si es un departamento aun mas grande se arregla el precio', '/images/gigs/default-image.png', 15000, 40000, 3, 3, 0, default, default),
-- Video
(default, 'Filmacion de cortometrajes', 'Hago cortometrajes de hasta 10 minutos', 'El precio minimo incluye mis propios equipos y camaras y tres minutos. Puedo proveer la escenografia pero se suma al precio total. Cuanto mas dure y mas escenas tenga mas aumenta el precio ', '/images/gigs/default-image.png', 7000, 18000, 4,4, 0, default, default),
(default, 'Edición de video', 'Edito videos de YouTube y TikTok', 'El minimo es para un video de TikTok o un video de youtube que dure 3 minutos o menos. Para agregarle intro a un video de youtube se aumenta el precio', '/images/gigs/default-image.png', 1500, 8000, 4, 4, 0, default, default),
(default, 'Animaciones', 'Hago animaciones y videos animados', 'El precio minimo es para una animacion minima y basica, el precio es negociable dependiendo que se requiera', '/images/gigs/default-image.png', 800, 6000, 4, 4, 0, default, default),
-- Marketing
(default, 'Analisis estrategico', 'Analisis completo de la empresa', 'Incluye FODA, Porter, portfolio entre otras, el precio varia segun el tamaño de la empresa', '/images/gigs/default-image.png', 3000, 10000, 5, 5, 0, default, default),
(default, 'Manejo de redes sociales', 'Manejo de las redes que tengan: Twitter, Instagram, Facebook', 'El precio minimo es para el manejo de una sola red social, cuanto mas activa que se quieran las cuentas mayor es el precio. El precio es por mes', '/images/gigs/default-image.png', 20000, 35000, 5, 5, 0, default, default),
(default, 'Analisis financiero', 'Analizo los riesgos y las oportunidades que tiene la empresa', 'Un analisis basico es el precio minimo. Un chequeo constante es negociable', '/images/gigs/default-image.png', 8000, 17000, 5, 5, 0, default, default),
-- Musica
(default, 'Musica para juegos', 'Hago musica para juegos de suspenso, retro y RPGs de fantasia', 'Precio base incluye dos canciones y 7 efectos especiales. Cada cancion aumenta el precio', '/images/gigs/default-image.png', 6500, 14000, 6, 6, 0, default, default),
(default, 'Jingles', 'Hago landings con o sin diseño previo hasta de 4 pantallas', 'Sin diseño: $300. Con hosteo: $500. Una pantalla: $1000. Cada pantalla extra: $700', '/images/gigs/default-image.png', 1000, 3900, 6, 6, 0, default, default),
(default, 'Edicion de podcasts', 'Hago landings con o sin diseño previo hasta de 4 pantallas', 'Sin diseño: $300. Con hosteo: $500. Una pantalla: $1000. Cada pantalla extra: $700', '/images/gigs/default-image.png', 1000, 3900, 6, 6, 0, default, default),
-- Ingenieria
(default, 'Desarrollo de Landing Pages', 'Hago landings con o sin diseño previo hasta de 4 pantallas', 'Sin diseño: $300. Con hosteo: $500. Una pantalla: $1000. Cada pantalla extra: $700', '/images/gigs/default-image.png', 1000, 3900, 7, 7, 0, default, default),
(default, 'Desarrollo de Landing Pages', 'Hago landings con o sin diseño previo hasta de 4 pantallas', 'Sin diseño: $300. Con hosteo: $500. Una pantalla: $1000. Cada pantalla extra: $700', '/images/gigs/default-image.png', 1000, 3900, 7, 7, 0, default, default),
(default, 'Desarrollo de Landing Pages', 'Hago landings con o sin diseño previo hasta de 4 pantallas', 'Sin diseño: $300. Con hosteo: $500. Una pantalla: $1000. Cada pantalla extra: $700', '/images/gigs/default-image.png', 1000, 3900, 7, 7, 0, default, default);

INSERT INTO ratings VALUES 
(default, 5, 1, 1),
(default, 4, 2, 1),
(default, 3, 3, 1),
(default, 2, 4, 1),
(default, 3, 1, 2),
(default, 3, 2, 2),
(default, 3, 3, 2),
(default, 3, 4, 2),
(default, 3, 1, 5),
(default, 3, 2, 5),
(default, 3, 3, 5),
(default, 3, 4, 5),
(default, 5, 1, 10),
(default, 5, 2, 10),
(default, 5, 3, 10),
(default, 5, 4, 10);