# Movie Reservation System

## Overview

The Movie Reservation System is a backend application designed to manage movie reservations, user authentication, and administrative tasks. It is built using TypeScript, Express.js, and Prisma ORM with a PostgreSQL database.

## Features

- User Authentication (Login, Registration, Email Validation)
- Role Management (Admin, User)
- Movie Management (CRUD operations)
- Room and Seat Management
- Showtime Management
- Reservation Management
- Email Notifications

## Technologies Used

- **TypeScript**: For type-safe JavaScript.
- **Express.js**: Web framework for Node.js.
- **Prisma ORM**: Database ORM for PostgreSQL.
- **PostgreSQL**: Relational database.
- **JWT**: JSON Web Tokens for authentication.
- **Bcrypt**: Password hashing.
- **Docker**: Containerization.

## Project Structure

```
src/
├── config/                 # Configuration files
├── data/                   # Database connection and seed data
├── domain/                 # Business logic and entities
├── interfaces/             # TypeScript interfaces
├── presentation/           # Controllers, routes, and middlewares
└── app.ts                  # Entry point of the application
```

## Getting Started

### Prerequisites

- Node.js
- Docker
- PostgreSQL

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/movie-reservation-system.git
   cd movie-reservation-system/backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=port
   APP_URL=http://localhost:PORT
   JWT_SECRET_KEY=your_jwt_secret_key
   DATABASE_URL=your_db_url
   ```

4. Start PostgreSQL using Docker:

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

7. Start the application:
   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/login`: User login
- `POST /api/auth/register`: User registration
- `GET /api/auth/validate-email/:token`: Email validation

### Movies

- `GET /api/movies`: Get all movies
- `GET /api/movies/:id`: Get movie by ID
- `POST /api/movies`: Add a new movie (Admin only)
- `PUT /api/movies`: Update a movie (Admin only)
- `DELETE /api/movies/:id`: Delete a movie (Admin only)

### Rooms

- `GET /api/rooms`: Get all rooms
- `GET /api/rooms/:id`: Get room by ID
- `POST /api/rooms`: Add a new room (Admin only)
- `PUT /api/rooms/:id`: Update a room (Admin only)
- `DELETE /api/rooms/:id`: Delete a room (Admin only)

### Showtimes

- `GET /api/showtimes`: Get all showtimes
- `GET /api/showtimes/:id`: Get showtime by ID
- `GET /api/showtimes/movie/:movieId`: Get showtimes by movie ID
- `POST /api/showtimes`: Add a new showtime (Admin only)
- `PUT /api/showtimes/:id`: Update a showtime (Admin only)
- `DELETE /api/showtimes/:id`: Delete a showtime (Admin only)

### Reservations

- `GET /api/reservations`: Get all reservations (Admin only)
- `GET /api/reservations/:id`: Get reservation by ID (Admin only)
- `POST /api/reservations`: Add a new reservation
- `DELETE /api/reservations/:id`: Delete a reservation

### Roles

- `POST /api/roles/assign-role`: Assign a role to a user (Admin only)

### Seats

- `GET /api/seats`: Get all seats
- `GET /api/seats/:id`: Get seat by ID
- `POST /api/seats`: Add a new seat
- `PUT /api/seats/:id`: Update a seat
- `DELETE /api/seats/:id`: Delete a seat
