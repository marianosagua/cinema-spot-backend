-- Nota: Asegurate de tener habilitada la extensión "pgcrypto" para usar gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tabla categories
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla movies
DROP TABLE IF EXISTS movies CASCADE;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    poster TEXT NOT NULL,
    category INT,
    CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES categories (id) ON DELETE
    SET
        NULL ON UPDATE NO ACTION
);

-- Tabla roles
DROP TABLE IF EXISTS roles CASCADE;

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL
);

-- Tabla rooms
DROP TABLE IF EXISTS rooms CASCADE;

CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);

-- Tabla seats
DROP TABLE IF EXISTS seats CASCADE;

CREATE TABLE seats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seat_number INT NOT NULL,
    room UUID,
    is_available BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT fk_room_seat FOREIGN KEY (room) REFERENCES rooms (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Tabla showtimes
DROP TABLE IF EXISTS showtimes CASCADE;

CREATE TABLE showtimes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    movie INT,
    start_time TIMESTAMP(6) NOT NULL,
    end_time TIMESTAMP(6) NOT NULL,
    room UUID NOT NULL,
    is_full BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT fk_movie_showtimes FOREIGN KEY (movie) REFERENCES movies (id) ON UPDATE NO ACTION,
    CONSTRAINT fk_room_showtimes FOREIGN KEY (room) REFERENCES rooms (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Tabla users
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL UNIQUE,
    role INT NOT NULL DEFAULT 2,
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now(),
    email_validated BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT fk_user_role FOREIGN KEY (role) REFERENCES roles (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Tabla reservations
DROP TABLE IF EXISTS reservations CASCADE;

CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    showtime_id UUID NOT NULL,
    seat_id UUID NOT NULL,
    CONSTRAINT fk_reservation_seat FOREIGN KEY (seat_id) REFERENCES seats (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_reservation_showtime FOREIGN KEY (showtime_id) REFERENCES showtimes (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_reservation_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);