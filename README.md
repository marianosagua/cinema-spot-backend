# 🎬 CinemaSpot Backend

## 📋 Overview

CinemaSpot is a backend application that manages movie reservations, user authentication, and administrative tasks. Built with TypeScript, Express.js, and Prisma ORM using a PostgreSQL database, it offers a robust platform for movie booking operations.

## ✨ Features

- User Authentication (Login, Registration, Email Validation)
- Role Management (Admin, User)
- Movie Management (CRUD operations)
- Room and Seat Management
- Showtime Management
- Reservation Management
- Email Notifications
- Future Releases Management

## 🛠 Technologies Used

- **TypeScript**: For type-safe JavaScript.
- **Express.js**: Web framework for Node.js.
- **Prisma ORM**: Database ORM for PostgreSQL.
- **PostgreSQL**: Relational database.
- **JWT**: JSON Web Tokens for authentication.
- **Bcrypt**: Password hashing.
- **Handlebars**: HTML templates for emails.
- **Docker**: Containerization.

## 📁 Project Structure

```
src/
├── config/                 # Configuration files (including environment setups)
├── data/                   # Database connection and seed data
├── domain/                 # Business logic and entities
├── interfaces/             # TypeScript interfaces
├── presentation/           # Controllers, routes, and middlewares
│   ├── views/              # Handlebars templates
│   └── ...
└── app.ts                  # Entry point of the application
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- Docker (with Docker Compose)
- PostgreSQL

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/CineSpot.git
   cd CineSpot/cinemaspot_backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following content:

   ```env
   PORT=3000
   APP_URL=http://localhost:3000
   JWT_SECRET_KEY=your_jwt_secret_key
   POSTGRES_USER=cinemaspot-user
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=cinemaspot-db
   DATABASE_URL="postgresql://cinemaspot-user:your_password@localhost:5433/cinemaspot-db?schema=public"
   ```

4. Start PostgreSQL using Docker Compose:

   ```sh
   docker-compose up -d
   ```

5. Run database migrations:

   ```sh
   npx prisma migrate dev
   ```

6. Seed the database:

   ```sh
   npm run seed
   ```

7. Start the application in development mode:

   ```sh
   npm run dev
   ```

## 🔌 API Endpoints

### 🔐 Authentication

- `POST /api/auth/login`: User login.
- `POST /api/auth/register`: User registration.
- `GET /api/auth/validate-email/:token`: Email validation.

### 🎥 Movies

- `GET /api/movies`: Get all movies.
- `GET /api/movies/:id`: Get a movie by ID.
- `POST /api/movies`: Add a new movie (Admin only).
- `PUT /api/movies`: Update a movie (Admin only).
- `DELETE /api/movies/:id`: Delete a movie (Admin only).

### 🍿 Future Releases

- `GET /api/future-releases`: Get all upcoming movies.
- `GET /api/future-releases/:id`: Get upcoming movie by ID.
- `POST /api/future-releases`: Add a new upcoming movie (Admin only).
- `PUT /api/future-releases/:id`: Update an upcoming movie (Admin only).
- `DELETE /api/future-releases/:id`: Delete an upcoming movie (Admin only).

### 🏛️ Rooms

- `GET /api/rooms`: Get all rooms.
- `GET /api/rooms/:id`: Get room by ID.
- `POST /api/rooms`: Add a new room (Admin only).
- `PUT /api/rooms/:id`: Update a room (Admin only).
- `DELETE /api/rooms/:id`: Delete a room (Admin only).

### 🕒 Showtimes

- `GET /api/showtimes`: Get all showtimes.
- `GET /api/showtimes/:id`: Get a showtime by ID.
- `GET /api/showtimes/movie/:movieId`: Get showtimes by movie ID.
- `POST /api/showtimes`: Add a new showtime (Admin only).
- `PUT /api/showtimes/:id`: Update a showtime (Admin only).
- `DELETE /api/showtimes/:id`: Delete a showtime (Admin only).

### 🎟️ Reservations

- `GET /api/reservations`: Get all reservations (Admin only).
- `GET /api/reservations/:id`: Get a reservation by ID.
- `GET /api/reservations/user/:userId`: Get reservations by user ID.
- `POST /api/reservations`: Add a new reservation.
- `DELETE /api/reservations/:id`: Delete a reservation.

### 👑 Roles

- `POST /api/roles/assign-role`: Assign a role to a user (Admin only).
- `GET /api/roles`: Get all roles (Admin only).
- `GET /api/roles/:id`: Get a role by ID.
- `PUT /api/roles/:id`: Update an existing role (Admin only).
- `DELETE /api/roles/:id`: Delete a role (Admin only).

### 💺 Seats

- `GET /api/seats`: Get all seats.
- `GET /api/seats/:id`: Get a seat by ID.
- `GET /api/seats/room/:name`: Get seats by room.
- `POST /api/seats`: Add a new seat.
- `PUT /api/seats/:id`: Update a seat.
- `DELETE /api/seats/:id`: Delete a seat.

### 👥 Users

- `GET /api/users`: Retrieve all users (Admin only).
- `GET /api/users/:id`: Retrieve a user by ID.
- `PUT /api/users/:id`: Update a user's information (Admin only).
- `DELETE /api/users/:id`: Delete a user (Admin only).

### 📚 Categories

- `GET /api/categories`: Get all categories.
- `GET /api/categories/:id`: Get a category by ID.
- `POST /api/categories`: Add a new category (Admin only).
- `PUT /api/categories/:id`: Update a category (Admin only).
- `DELETE /api/categories/:id`: Delete a category (Admin only).
