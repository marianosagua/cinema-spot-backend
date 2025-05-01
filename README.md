# 🎬 CinemaSpot Backend

## 📋 Visión General

CinemaSpot es una aplicación backend que gestiona reservas de películas, autenticación de usuarios y tareas administrativas. Construida con TypeScript, Express.js y Prisma ORM utilizando una base de datos PostgreSQL, ofrece una plataforma robusta para operaciones de reserva de películas.

## ✨ Características

- Autenticación de Usuarios (Inicio de Sesión, Registro, Validación de Correo)
- Gestión de Roles (Administrador, Usuario)
- Gestión de Películas (operaciones CRUD)
- Gestión de Salas y Asientos
- Gestión de Horarios de Proyección
- Gestión de Reservas
- Notificaciones por Correo
- Gestión de Próximos Estrenos

## 🛠 Tecnologías Utilizadas

- **TypeScript**: Para JavaScript con tipado seguro.
- **Express.js**: Framework web para Node.js.
- **Prisma ORM**: ORM para base de datos PostgreSQL.
- **PostgreSQL**: Base de datos relacional.
- **JWT**: JSON Web Tokens para autenticación.
- **Bcrypt**: Hash de contraseñas.
- **Handlebars**: Plantillas HTML para correos.
- **Docker**: Contenedorización.

## 📁 Estructura del Proyecto

```
src/
├── config/                 # Archivos de configuración (incluida configuración de entorno)
├── data/                   # Conexión a la base de datos y datos de prueba
├── domain/                 # Lógica de negocio y entidades
├── interfaces/             # Interfaces de TypeScript
├── presentation/           # Controladores, rutas y middlewares
│   ├── views/              # Plantillas de Handlebars
│   └── ...
└── app.ts                  # Punto de entrada de la aplicación
```

## 🚀 Primeros Pasos

### Prerrequisitos

- Node.js
- Docker (con Docker Compose)
- PostgreSQL

### Instalación

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/your-username/CineSpot.git
   cd CineSpot/cinemaspot_backend
   ```

2. Instalar dependencias:

   ```sh
   npm install
   ```

3. Configurar variables de entorno:

   Crear un archivo `.env` en el directorio raíz con el siguiente contenido:

   ```env
   PORT=3000
   APP_URL=http://localhost:3000
   JWT_SECRET_KEY=your_jwt_secret_key
   POSTGRES_USER=cinemaspot-user
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=cinemaspot-db
   DATABASE_URL="postgresql://cinemaspot-user:your_password@localhost:5433/cinemaspot-db?schema=public"
   ```

4. Iniciar PostgreSQL usando Docker Compose:

   ```sh
   docker-compose up -d
   ```

5. Ejecutar migraciones de la base de datos:

   ```sh
   npx prisma migrate dev
   ```

6. Poblar la base de datos:

   ```sh
   npm run seed
   ```

7. Iniciar la aplicación en modo desarrollo:

   ```sh
   npm run dev
   ```

## 🔌 Endpoints de la API

### 🔐 Autenticación

- `POST /api/auth/login`: Inicio de sesión de usuario.
- `POST /api/auth/register`: Registro de usuario.
- `GET /api/auth/validate-email/:token`: Validación de correo electrónico.

### 🎥 Películas

- `GET /api/movies`: Obtener todas las películas.
- `GET /api/movies/:id`: Obtener una película por ID.
- `POST /api/movies`: Agregar una nueva película (Solo administrador).
- `PUT /api/movies`: Actualizar una película (Solo administrador).
- `DELETE /api/movies/:id`: Eliminar una película (Solo administrador).

### 🍿 Próximos Estrenos

- `GET /api/future-releases`: Obtener todas las películas próximas.
- `GET /api/future-releases/:id`: Obtener película próxima por ID.
- `POST /api/future-releases`: Agregar una nueva película próxima (Solo administrador).
- `PUT /api/future-releases/:id`: Actualizar una película próxima (Solo administrador).
- `DELETE /api/future-releases/:id`: Eliminar una película próxima (Solo administrador).

### 🏛️ Salas

- `GET /api/rooms`: Obtener todas las salas.
- `GET /api/rooms/:id`: Obtener sala por ID.
- `POST /api/rooms`: Agregar una nueva sala (Solo administrador).
- `PUT /api/rooms/:id`: Actualizar una sala (Solo administrador).
- `DELETE /api/rooms/:id`: Eliminar una sala (Solo administrador).

### 🕒 Horarios de Proyección

- `GET /api/showtimes`: Obtener todos los horarios de proyección.
- `GET /api/showtimes/:id`: Obtener un horario de proyección por ID.
- `GET /api/showtimes/movie/:movieId`: Obtener horarios de proyección por ID de película.
- `POST /api/showtimes`: Agregar un nuevo horario de proyección (Solo administrador).
- `PUT /api/showtimes/:id`: Actualizar un horario de proyección (Solo administrador).
- `DELETE /api/showtimes/:id`: Eliminar un horario de proyección (Solo administrador).

### 🎟️ Reservas

- `GET /api/reservations`: Obtener todas las reservas (Solo administrador).
- `GET /api/reservations/:id`: Obtener una reserva por ID.
- `GET /api/reservations/user/:userId`: Obtener reservas por ID de usuario.
- `POST /api/reservations`: Agregar una nueva reserva.
- `DELETE /api/reservations/:id`: Eliminar una reserva.

### 👑 Roles

- `POST /api/roles/assign-role`: Asignar un rol a un usuario (Solo administrador).
- `GET /api/roles`: Obtener todos los roles (Solo administrador).
- `GET /api/roles/:id`: Obtener un rol por ID.
- `PUT /api/roles/:id`: Actualizar un rol existente (Solo administrador).
- `DELETE /api/roles/:id`: Eliminar un rol (Solo administrador).

### 💺 Asientos

- `GET /api/seats`: Obtener todos los asientos.
- `GET /api/seats/:id`: Obtener un asiento por ID.
- `GET /api/seats/room/:name`: Obtener asientos por sala.
- `POST /api/seats`: Agregar un nuevo asiento.
- `PUT /api/seats/:id`: Actualizar un asiento.
- `DELETE /api/seats/:id`: Eliminar un asiento.

### 👥 Usuarios

- `GET /api/users`: Recuperar todos los usuarios (Solo administrador).
- `GET /api/users/:id`: Recuperar un usuario por ID.
- `PUT /api/users/:id`: Actualizar la información de un usuario (Solo administrador).
- `DELETE /api/users/:id`: Eliminar un usuario (Solo administrador).

### 📚 Categorías

- `GET /api/categories`: Obtener todas las categorías.
- `GET /api/categories/:id`: Obtener una categoría por ID.
- `POST /api/categories`: Agregar una nueva categoría (Solo administrador).
- `PUT /api/categories/:id`: Actualizar una categoría (Solo administrador).
- `DELETE /api/categories/:id`: Eliminar una categoría (Solo administrador).

### 👥 Reparto de Película

- `GET /api/movie-cast`: Obtener todas las relaciones de reparto de películas.
- `GET /api/movie-cast/movie/:movieId`: Obtener todo el reparto para una película específica.
- `GET /api/movie-cast/:movie/:actor`: Obtener una relación específica película-actor.
- `POST /api/movie-cast`: Agregar una nueva relación película-actor (Solo administrador).
- `DELETE /api/movie-cast/:movie/:actor`: Eliminar una relación película-actor (Solo administrador).
