# 🎬 CinemaSpot Backend

## 📋 Visión General

CinemaSpot es una aplicación backend que gestiona reservas de películas, autenticación de usuarios y tareas administrativas. Construida con TypeScript, Express.js y Prisma ORM utilizando una base de datos PostgreSQL, ofrece una plataforma robusta para operaciones de reserva de películas.

## ✨ Características

- 🔐 **Autenticación Completa**: Inicio de sesión, registro, validación de email, recuperación de contraseña
- 👥 **Gestión de Roles**: Administrador y usuario con permisos diferenciados
- 🎬 **Gestión de Películas**: Operaciones CRUD completas con categorías y reparto
- 🎭 **Gestión de Actores**: CRUD completo de actores con búsqueda por nombre
- 🏛️ **Gestión de Salas**: Configuración de salas de cine y asientos
- ⏰ **Horarios de Proyección**: Programación de funciones de películas
- 🎟️ **Sistema de Reservas**: Reserva de asientos para funciones específicas
- 📧 **Notificaciones por Email**: Validación de cuenta y recuperación de contraseña
- 🍿 **Próximos Estrenos**: Gestión de películas próximas a estrenar
- 🛡️ **Seguridad**: JWT, encriptación de contraseñas, CORS configurado
- 🌐 **API RESTful**: Endpoints bien estructurados y documentados

## 🛠 Tecnologías Utilizadas

- **TypeScript**: JavaScript con tipado estático para mayor seguridad
- **Express.js**: Framework web minimalista y flexible para Node.js
- **Prisma ORM**: ORM moderno para base de datos con migraciones automáticas
- **PostgreSQL**: Base de datos relacional robusta y escalable
- **JWT**: JSON Web Tokens para autenticación stateless
- **Bcrypt**: Encriptación segura de contraseñas
- **Handlebars**: Motor de plantillas para emails personalizados
- **CORS**: Configuración de Cross-Origin Resource Sharing
- **Docker**: Contenedorización para despliegue consistente
- **Resend**: Servicio de envío de emails transaccionales

## 📁 Estructura del Proyecto

```
src/
├── config/                 # Configuraciones (entorno, JWT, bcrypt, CORS)
├── data/                   # Conexión a BD, seeders y migraciones
├── domain/                 # Lógica de negocio, entidades y DTOs
│   ├── dtos/              # Data Transfer Objects para validación
│   ├── entities/          # Entidades del dominio
│   └── errors/            # Manejo de errores personalizados
├── interfaces/             # Interfaces TypeScript
├── presentation/           # Capa de presentación
│   ├── auth/              # Autenticación y autorización
│   ├── movies/            # Gestión de películas
│   ├── showtimes/         # Horarios de proyección
│   ├── reservations/      # Sistema de reservas
│   ├── middlewares/       # Middlewares personalizados
│   └── views/             # Plantillas Handlebars para emails
└── app.ts                  # Punto de entrada principal
```

## 🚀 Primeros Pasos

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **Docker** (con Docker Compose)
- **PostgreSQL** (o usar Docker)
- **Cuenta en Resend** (para envío de emails)

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
   # Base de datos
   DATABASE_URL="postgresql://cinemaspot-user:your_password@localhost:5433/cinemaspot-db?schema=public"
   
   # Servidor
   PORT=3000
   APP_URL=http://localhost:3000
   
   # Frontend
   FRONTEND_URL=http://localhost:3001
   
   # Autenticación
   JWT_SECRET_KEY=your_jwt_secret_key
   
   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
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

8. Verificar que la aplicación esté funcionando:

   ```sh
   curl http://localhost:3000/api/movies
   ```

## 🔧 Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo con hot reload
- `npm run build`: Compila el proyecto TypeScript
- `npm run start`: Compila y ejecuta en modo producción
- `npm run seed`: Pobla la base de datos con datos de ejemplo

## 🔌 Endpoints de la API

### 🔐 Autenticación

- `POST /api/auth/login`: Inicio de sesión de usuario.
- `POST /api/auth/register`: Registro de usuario.
- `GET /api/auth/validate-email/:token`: Validación de correo electrónico.
- `POST /api/auth/forgot-password`: Solicitar recuperación de contraseña.
- `POST /api/auth/reset-password/:token`: Restablecer contraseña.
- `GET /api/auth/reset-password/:token`: Formulario de restablecimiento de contraseña.
- `GET /api/auth/reset-password-success`: Página de éxito tras restablecer contraseña.

### 🎥 Películas

- `GET /api/movies`: Obtener todas las películas.
- `GET /api/movies/:id`: Obtener una película por ID.
- `POST /api/movies`: Agregar una nueva película (Solo administrador).
- `PUT /api/movies/:id`: Actualizar una película (Solo administrador).
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

### 🎭 Actores

- `GET /api/actors`: Obtener todos los actores (Solo administrador).
- `GET /api/actors/search?q=termino`: Buscar actores por nombre o apellido (Solo administrador).
- `GET /api/actors/:id`: Obtener un actor por ID (Solo administrador).
- `POST /api/actors`: Crear un nuevo actor (Solo administrador).
- `PUT /api/actors/:id`: Actualizar un actor existente (Solo administrador).
- `DELETE /api/actors/:id`: Eliminar un actor (Solo administrador).

## 🔒 Autenticación y Autorización

### Roles de Usuario
- **Administrador**: Acceso completo a todas las funcionalidades
- **Usuario**: Acceso limitado a consultas y reservas

### Endpoints Protegidos
Los endpoints marcados con "(Solo administrador)" requieren autenticación con rol de administrador.

**Módulos completamente protegidos:**
- **Actores**: Todas las operaciones requieren permisos de administrador
- **Roles**: Gestión completa solo para administradores
- **Usuarios**: Consultas y gestión solo para administradores

### Headers de Autenticación
```http
Authorization: Bearer <jwt_token>
```

## 🌐 Configuración de CORS

La aplicación incluye configuración de CORS para permitir peticiones desde el frontend:

- **Desarrollo**: Permite cualquier origen
- **Producción**: Configurable mediante variables de entorno
- **Credenciales**: Habilitadas para autenticación
- **Métodos**: GET, POST, PUT, DELETE, PATCH, OPTIONS

## 📧 Sistema de Emails

### Templates Disponibles
- **Validación de Email**: Confirmación de registro
- **Recuperación de Contraseña**: Restablecimiento seguro
- **Formularios**: Interfaces para restablecer contraseña

### Configuración
- **Servicio**: Resend
- **Templates**: Handlebars
- **Personalización**: Variables dinámicas

## 📝 Ejemplos de Uso

### Crear un Actor
```bash
curl -X POST http://localhost:3000/api/actors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_admin>" \
  -d '{
    "first_name": "Tom",
    "last_name": "Hanks",
    "age": 67,
    "nationality": "Estadounidense"
  }'
```

### Buscar Actores
```bash
curl -X GET "http://localhost:3000/api/actors/search?q=tom" \
  -H "Authorization: Bearer <token_admin>"
```

### Obtener Todos los Actores
```bash
curl -X GET http://localhost:3000/api/actors \
  -H "Authorization: Bearer <token_admin>"
```

### Estructura de Datos de Actor
```json
{
  "id": 1,
  "first_name": "Tom",
  "last_name": "Hanks",
  "age": 67,
  "nationality": "Estadounidense",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Validaciones:**
- `first_name`: String, 2-50 caracteres, requerido
- `last_name`: String, 2-50 caracteres, requerido
- `age`: Number, 1-120, requerido
- `nationality`: String, 2-50 caracteres, requerido

## 🚀 Despliegue

### Variables de Entorno de Producción
```env
# Base de datos
DATABASE_URL="postgresql://user:password@host:port/database"

# Servidor
PORT=3000
APP_URL="https://api.tudominio.com"

# Frontend
FRONTEND_URL="https://tudominio.com"

# Autenticación
JWT_SECRET_KEY="clave_super_secreta_produccion"

# Email
RESEND_API_KEY="re_tu_api_key_de_resend"
```

### Docker
```sh
# Construir imagen
docker build -t cinemaspot-backend .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env cinemaspot-backend
```
