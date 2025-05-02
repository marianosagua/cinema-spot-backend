// dataSeed.ts - Datos de ejemplo para inicialización y pruebas de CinemaSpot Backend
//
// Este archivo exporta un objeto con datos de ejemplo (seed) para poblar la base de datos del sistema CinemaSpot.
// Es utilizado principalmente en scripts de seed para desarrollo, pruebas o despliegue inicial.
//
// Estructura del objeto exportado:
// - users: Lista de usuarios iniciales (nombre, email, contraseña, rol).
// - movies: Películas con detalles completos (título, descripción, categoría, duración, etc.).
// - rooms: Salas de cine disponibles.
// - categories: Categorías/genres de películas.
// - roles: Tipos de roles de usuario (ADMIN, USER).
// - showtimes: Funciones programadas (película, horario, sala).
// - seats: Asientos disponibles por sala.
// - futureReleases: Próximos estrenos con fecha futura.
// - actors: Actores disponibles para el reparto de películas.
// - movieCast: Relación película-actor para el reparto.
//
// Uso típico:
// import { dataSeed } from "../data/seed/dataSeed";
// await prismaClient.users.createMany({ data: dataSeed.users });
//
// Cada campo está diseñado para reflejar la estructura de la base de datos y facilitar la carga masiva de datos.
//
// Modifica este archivo para agregar, quitar o actualizar datos de ejemplo según las necesidades del proyecto.

export const dataSeed = {
  users: [
    {
      first_name: "James",
      last_name: "Smith",
      email: "ejemplo1@ejemplo1.com",
      password: "9999999",
      role: "ADMIN",
    },
    {
      first_name: "Emily",
      last_name: "Johnson",
      email: "ejemplo2@ejemplo2.com",
      password: "8888888",
      role: "ADMIN",
    },
  ],
  movies: [
    {
      title: "Interstellar",
      description: "Explorers seek a new home for humanity beyond the stars.",
      poster: "https://i.postimg.cc/WpYzW6Qt/interestellar-poster.jpg",
      category: 9,
      duration: "02:49:00",
      banner: "https://i.postimg.cc/KjPt7Jsz/Interstellar.jpg",
      synopsis: "A journey across time and space to save humanity.",
      trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      director: "Christopher Nolan",
      rating: "PG-13",
      review: 8.6,
    },
    {
      title: "The Dark Knight",
      description:
        "Batman faces his most dangerous opponent, the Joker. The Joker''s reign of terror causes Gotham to descend into chaos.",
      poster: "https://i.postimg.cc/YqyrRrLF/the-dark-knight.jpg",
      category: 18,
      duration: "02:32:00",
      banner: "https://i.postimg.cc/fL6vf3zH/christian-bale-batsuit.jpg",
      synopsis:
        "A gripping story about good versus evil in the world of Gotham.",
      trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      director: "Christopher Nolan",
      rating: "PG-13",
      review: 9.0,
    },
    {
      title: "Inception",
      description:
        "A thief who steals secrets by infiltrating the subconscious of his targets is tasked with planting an idea in someone''s mind.",
      poster:
        "https://i.postimg.cc/ZnBd7BR9/MV5-BMj-Ax-Mz-Y3-Njcx-NF5-BMl5-Ban-Bn-Xk-Ft-ZTcw-NTI5-OTM0-Mw-V1.jpg",
      category: 9,
      duration: "02:28:00",
      banner:
        "https://i.postimg.cc/R0Y1v3HM/origen-inception-christopher-nolan-mutaciones-1.jpg",
      synopsis: "A complex, mind-bending thriller about dreams within dreams.",
      trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      director: "Christopher Nolan",
      rating: "PG-13",
      review: 8.8,
    },
    {
      title: "Pulp Fiction",
      description:
        "A series of interconnected stories involving crime, redemption, and fate in Los Angeles.",
      poster: "https://i.postimg.cc/15pxnycP/pulp-fiction-poster.jpg",
      category: 18,
      duration: "02:34:00",
      banner: "https://i.postimg.cc/qB3wMGwW/pulp-1100x733.jpg",
      synopsis:
        "An intense, stylish portrayal of crime and its consequences in L.A.",
      trailer: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
      director: "Quentin Tarantino",
      rating: "R",
      review: 8.9,
    },
    {
      title: "The Shawshank Redemption",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      poster:
        "https://i.postimg.cc/Y0R1ZGBM/the-shawshank-redeption-poster.jpg",
      category: 4,
      duration: "02:22:00",
      banner: "https://i.postimg.cc/vHwz16ST/image.jpg",
      synopsis: "A tale of friendship and resilience in the face of adversity.",
      trailer: "https://www.youtube.com/watch?v=6hB3S9bIaco",
      director: "Frank Darabont",
      rating: "R",
      review: 9.3,
    },
    {
      title: "The Godfather",
      description:
        "The story of the powerful and complex Corleone family, led by patriarch Don Vito Corleone, as they navigate the world of crime and betrayal.",
      poster: "https://i.postimg.cc/GhN3SYB0/the-godfather-poster.png",
      category: 18,
      duration: "02:55:00",
      banner:
        "https://i.postimg.cc/HnX9ZpjT/HT-godfatrher-jef-170308-16x9-992.jpg",
      synopsis: "A legendary saga about power, family, and crime.",
      trailer: "https://www.youtube.com/watch?v=sY1S34973zA",
      director: "Francis Ford Coppola",
      rating: "R",
      review: 9.2,
    },
    {
      title: "The Matrix",
      description:
        "A hacker learns the shocking truth about reality, leading him to become part of a revolution to free humanity from a simulated existence.",
      poster: "https://i.postimg.cc/ZRy7GLwZ/the-matrix-poster.jpg",
      category: 9,
      duration: "02:16:00",
      banner: "https://i.postimg.cc/dtR9GtzB/descarga.jpg",
      synopsis: "A mind-bending story about reality and simulation.",
      trailer: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
      director: "Lana Wachowski",
      rating: "R",
      review: 8.7,
    },
    {
      title: "Forrest Gump",
      description:
        "The extraordinary life of a simple man from Alabama who unexpectedly influences major historical events.",
      poster: "https://i.postimg.cc/7LnjB9tR/forrest-gump-poster.jpg",
      category: 4,
      duration: "02:22:00",
      banner: "https://i.postimg.cc/pL2JCMvt/maxresdefault.jpg",
      synopsis:
        "A touching and humorous tale of a man who unwittingly changes history.",
      trailer: "https://www.youtube.com/watch?v=bLvqoHBptjg",
      director: "Robert Zemeckis",
      rating: "PG-13",
      review: 8.8,
    },
    {
      title: "The Lord of the Rings",
      description:
        "A young hobbit embarks on an epic quest to destroy the One Ring, with the fate of Middle-Earth hanging in the balance.",
      poster:
        "https://i.postimg.cc/28hy91ws/dd24aedc7ba4fb38016329c1fb5cade7.jpg",
      category: 5,
      duration: "03:30:00",
      banner: "https://i.postimg.cc/k5GFrND1/hobbit-1-1659123079896.jpg",
      synopsis:
        "A legendary tale of good versus evil set in the magical world of Middle-Earth.",
      trailer: "https://www.youtube.com/watch?v=PwiXeJfoR28",
      director: "Peter Jackson",
      rating: "PG-13",
      review: 8.9,
    },
    {
      title: "Fight Club",
      description:
        "An insomniac office worker forms an underground fight club as a form of male bonding and a rejection of consumerism.",
      poster:
        "https://i.postimg.cc/jqWLNgJd/MV5-BOTgy-OGQ1-NDIt-NGU3-Ny00-Mj-U3-LTg2-YWEt-Nm-Ey-Yj-Bi-Mj-I1-Y2-M5-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX1000.jpg",
      category: 18,
      duration: "02:19:00",
      banner:
        "https://i.postimg.cc/XYQcD1NB/fight-club-critica-echo-boomer.jpg",
      synopsis:
        "A gritty and dark satire about the breakdown of modern society.",
      trailer: "https://www.youtube.com/watch?v=SUXWAEX2jlg",
      director: "David Fincher",
      rating: "R",
      review: 8.8,
    },
    {
      title: "Goodfellas",
      description:
        "The true story of a young man who rises through the ranks of the Mafia, only to fall victim to betrayal and violence.",
      poster: "https://i.postimg.cc/sgxtfFJ5/s-l400.jpg",
      category: 18,
      duration: "02:26:00",
      banner: "https://i.postimg.cc/D0kqbt6H/buenos-muchachos-3.jpg",
      synopsis: "A gripping, real-life tale of crime, loyalty, and betrayal.",
      trailer: "https://www.youtube.com/watch?v=qo5jJp4p8p4",
      director: "Martin Scorsese",
      rating: "R",
      review: 8.7,
    },
    {
      title: "The Silence of the Lambs",
      description:
        "A young FBI agent seeks the help of imprisoned cannibalistic serial killer Hannibal Lecter to catch another serial killer on the loose.",
      poster: "https://i.postimg.cc/Gmj2r66z/Josh-Beamish-Silence-Of-Lambs.jpg",
      category: 18,
      duration: "01:58:00",
      banner:
        "https://i.postimg.cc/MTj7HW71/tumblr-inline-o0ox4oi-APe1sl6jqt-500.jpg",
      synopsis:
        "A chilling psychological thriller about manipulation and mind games.",
      trailer: "https://www.youtube.com/watch?v=W6Mm8Vco1pY",
      director: "Jonathan Demme",
      rating: "R",
      review: 8.6,
    },
  ],
  rooms: [{ name: "A1" }, { name: "B1" }, { name: "C1" }],
  categories: [
    { name: "Action" },
    { name: "Adventure" },
    { name: "Comedy" },
    { name: "Drama" },
    { name: "Fantasy" },
    { name: "Horror" },
    { name: "Mystery" },
    { name: "Romance" },
    { name: "Science Fiction" },
    { name: "Thriller" },
    { name: "Animation" },
    { name: "Documentary" },
    { name: "Biography" },
    { name: "Musical" },
    { name: "Historical" },
    { name: "War" },
    { name: "Western" },
    { name: "Crime" },
    { name: "Family" },
    { name: "Sport" },
  ],
  roles: [
    {
      id: 1,
      name: "ADMIN",
      description:
        "An administrative user with full access to the system, able to manage users, settings, and other critical operations.",
    },
    {
      id: 2,
      name: "USER",
      description:
        "A regular user with limited access to features and data, typically for general browsing and usage of the application.",
    },
  ],
  showtimes: [
    // Morning showtimes
    {
      movie: "Interstellar",
      start_time: "2024-05-01T10:00:00",
      end_time: "2024-05-01T12:49:00",
      room: "A1",
    },
    {
      movie: "The Dark Knight",
      start_time: "2024-05-01T10:00:00",
      end_time: "2024-05-01T12:32:00",
      room: "B1",
    },
    {
      movie: "Inception",
      start_time: "2024-05-01T10:00:00",
      end_time: "2024-05-01T12:28:00",
      room: "C1",
    },

    // Afternoon showtimes
    {
      movie: "Pulp Fiction",
      start_time: "2024-05-01T14:00:00",
      end_time: "2024-05-01T16:34:00",
      room: "A1",
    },
    {
      movie: "The Shawshank Redemption",
      start_time: "2024-05-01T14:00:00",
      end_time: "2024-05-01T16:22:00",
      room: "B1",
    },
    {
      movie: "The Godfather",
      start_time: "2024-05-01T14:00:00",
      end_time: "2024-05-01T16:55:00",
      room: "C1",
    },

    // Evening showtimes
    {
      movie: "The Matrix",
      start_time: "2024-05-01T19:00:00",
      end_time: "2024-05-01T21:16:00",
      room: "A1",
    },
    {
      movie: "Forrest Gump",
      start_time: "2024-05-01T19:00:00",
      end_time: "2024-05-01T21:22:00",
      room: "B1",
    },
    {
      movie: "The Lord of the Rings",
      start_time: "2024-05-01T19:00:00",
      end_time: "2024-05-01T22:30:00",
      room: "C1",
    },

    // Next day showtimes
    {
      movie: "Fight Club",
      start_time: "2024-05-02T10:00:00",
      end_time: "2024-05-02T12:19:00",
      room: "A1",
    },
    {
      movie: "Goodfellas",
      start_time: "2024-05-02T10:00:00",
      end_time: "2024-05-02T12:26:00",
      room: "B1",
    },
    {
      movie: "The Silence of the Lambs",
      start_time: "2024-05-02T10:00:00",
      end_time: "2024-05-02T11:58:00",
      room: "C1",
    },

    // Weekend showtimes
    {
      movie: "Interstellar",
      start_time: "2024-05-04T14:00:00",
      end_time: "2024-05-04T16:49:00",
      room: "A1",
    },
    {
      movie: "The Dark Knight",
      start_time: "2024-05-04T14:00:00",
      end_time: "2024-05-04T16:32:00",
      room: "B1",
    },
    {
      movie: "Inception",
      start_time: "2024-05-04T19:00:00",
      end_time: "2024-05-04T21:28:00",
      room: "A1",
    },
    {
      movie: "Pulp Fiction",
      start_time: "2024-05-04T19:00:00",
      end_time: "2024-05-04T21:34:00",
      room: "B1",
    },
    {
      movie: "The Shawshank Redemption",
      start_time: "2024-05-05T10:00:00",
      end_time: "2024-05-05T12:22:00",
      room: "A1",
    },
    {
      movie: "The Godfather",
      start_time: "2024-05-05T10:00:00",
      end_time: "2024-05-05T12:55:00",
      room: "B1",
    },
  ],
  seats: [
    { seat_number: 1, room: "A1", is_available: true },
    { seat_number: 2, room: "A1", is_available: true },
    { seat_number: 3, room: "A1", is_available: true },
    { seat_number: 4, room: "A1", is_available: true },
    { seat_number: 5, room: "A1", is_available: true },
    { seat_number: 6, room: "A1", is_available: true },
    { seat_number: 7, room: "A1", is_available: true },
    { seat_number: 8, room: "A1", is_available: true },
    { seat_number: 9, room: "A1", is_available: true },
    { seat_number: 10, room: "A1", is_available: true },

    { seat_number: 1, room: "B1", is_available: true },
    { seat_number: 2, room: "B1", is_available: true },
    { seat_number: 3, room: "B1", is_available: true },
    { seat_number: 4, room: "B1", is_available: true },
    { seat_number: 5, room: "B1", is_available: true },
    { seat_number: 6, room: "B1", is_available: true },
    { seat_number: 7, room: "B1", is_available: true },
    { seat_number: 8, room: "B1", is_available: true },
    { seat_number: 9, room: "B1", is_available: true },
    { seat_number: 10, room: "B1", is_available: true },

    { seat_number: 1, room: "C1", is_available: true },
    { seat_number: 2, room: "C1", is_available: true },
    { seat_number: 3, room: "C1", is_available: true },
    { seat_number: 4, room: "C1", is_available: true },
    { seat_number: 5, room: "C1", is_available: true },
    { seat_number: 6, room: "C1", is_available: true },
    { seat_number: 7, room: "C1", is_available: true },
    { seat_number: 8, room: "C1", is_available: true },
    { seat_number: 9, room: "C1", is_available: true },
    { seat_number: 10, room: "C1", is_available: true },
  ],
  futureReleases: [
    {
      title: "Captain America: New World Order",
      description:
        "Sam Wilson takes on the mantle of Captain America and faces new challenges in a changing world.",
      poster: "https://i.postimg.cc/N0w5qx6q/Gb-Kdq-KWIAAc-T5q.jpg",
      category: 1,
      duration: "02:15:00",
      banner: "https://i.postimg.cc/FsWBBWQz/70425-h3.jpg",
      synopsis:
        "Sam Wilson, the new Captain America, must uncover a conspiracy that threatens global peace.",
      trailer: "https://www.youtube.com/watch?v=trailer1",
      director: "Julius Onah",
      rating: "PG-13",
      release_date: "2025-05-03",
    },
    {
      title: "Mickey 17",
      description:
        "An expendable employee on a human colonization mission rebels against his fate.",
      poster:
        "https://i.postimg.cc/13KfSqJ8/Captura-de-pantalla-2025-04-06-212653.png",
      category: 2,
      duration: "01:50:00",
      banner: "https://i.postimg.cc/zGycZCJj/Critica-Mickey-17-1-min.jpg",
      synopsis:
        "Mickey 17 uncovers the truth behind his mission and fights for his survival.",
      trailer: "https://www.youtube.com/watch?v=trailer2",
      director: "Bong Joon-ho",
      rating: "PG-13",
      release_date: "2025-06-15",
    },
    {
      title: "Jurassic World: Rebirth",
      description:
        "The saga continues with new adventures and challenges in a world where dinosaurs coexist with humans.",
      poster:
        "https://i.postimg.cc/mrNhbFjc/5ad4e35246f489894d0a59e7a0606b96.jpg",
      category: 1,
      duration: "02:10:00",
      banner: "https://i.postimg.cc/3xzbKkNH/202524174522-1.jpg",
      synopsis:
        "The coexistence between humans and dinosaurs reaches a critical point, unleashing a new era of danger.",
      trailer: "https://www.youtube.com/watch?v=trailer3",
      director: "Colin Trevorrow",
      rating: "PG-13",
      release_date: "2025-07-20",
    },
    {
      title: "Avatar: Fire and Ash",
      description:
        "The continuation of the epic saga in Pandora, exploring new territories and cultures.",
      poster:
        "https://i.postimg.cc/LX95h6Qx/MV5-BYj-E0-OWZm-YWMt-Zj-Bh-Mi00-Yz-M5-LTkz-OTct-OTZh-MTIw-NDcx-Y2-U0-Xk-Ey-Xk-Fqc-Gc-V1.jpg",
      category: 3,
      duration: "02:45:00",
      banner:
        "https://i.postimg.cc/q7nDgp66/1-setrockspires-180719-concept-smm-gondola-2191-v011f-3df188e5.jpg",
      synopsis:
        "Jake Sully and Neytiri face new threats that put Pandora's harmony in jeopardy.",
      trailer: "https://www.youtube.com/watch?v=trailer4",
      director: "James Cameron",
      rating: "PG-13",
      release_date: "2025-12-18",
    },
  ],
  actors: [
    {
      first_name: "Matthew",
      last_name: "McConaughey",
      age: 54,
      nationality: "American",
    },
    {
      first_name: "Anne",
      last_name: "Hathaway",
      age: 41,
      nationality: "American",
    },
    {
      first_name: "Jessica",
      last_name: "Chastain",
      age: 47,
      nationality: "American",
    },
    {
      first_name: "Michael",
      last_name: "Caine",
      age: 91,
      nationality: "British",
    },
    {
      first_name: "Christian",
      last_name: "Bale",
      age: 50,
      nationality: "British",
    },
    {
      first_name: "Heath",
      last_name: "Ledger",
      age: 28,
      nationality: "Australian",
    },
    {
      first_name: "Aaron",
      last_name: "Eckhart",
      age: 56,
      nationality: "American",
    },
    {
      first_name: "Gary",
      last_name: "Oldman",
      age: 66,
      nationality: "British",
    },
    {
      first_name: "Leonardo",
      last_name: "DiCaprio",
      age: 49,
      nationality: "American",
    },
    {
      first_name: "Joseph",
      last_name: "Gordon-Levitt",
      age: 43,
      nationality: "American",
    },
    {
      first_name: "Ellen",
      last_name: "Page",
      age: 37,
      nationality: "Canadian",
    },
    { first_name: "Tom", last_name: "Hardy", age: 46, nationality: "British" },
    {
      first_name: "John",
      last_name: "Travolta",
      age: 70,
      nationality: "American",
    },
    {
      first_name: "Samuel L.",
      last_name: "Jackson",
      age: 75,
      nationality: "American",
    },
    {
      first_name: "Uma",
      last_name: "Thurman",
      age: 54,
      nationality: "American",
    },
    {
      first_name: "Bruce",
      last_name: "Willis",
      age: 69,
      nationality: "American",
    },
    {
      first_name: "Tim",
      last_name: "Robbins",
      age: 65,
      nationality: "American",
    },
    {
      first_name: "Morgan",
      last_name: "Freeman",
      age: 87,
      nationality: "American",
    },
    {
      first_name: "Bob",
      last_name: "Gunton",
      age: 78,
      nationality: "American",
    },
    {
      first_name: "William",
      last_name: "Sadler",
      age: 74,
      nationality: "American",
    },
    {
      first_name: "Marlon",
      last_name: "Brando",
      age: 80,
      nationality: "American",
    },
    { first_name: "Al", last_name: "Pacino", age: 84, nationality: "American" },
    {
      first_name: "James",
      last_name: "Caan",
      age: 82,
      nationality: "American",
    },
    {
      first_name: "Robert",
      last_name: "Duvall",
      age: 93,
      nationality: "American",
    },
    {
      first_name: "Keanu",
      last_name: "Reeves",
      age: 59,
      nationality: "Canadian",
    },
    {
      first_name: "Laurence",
      last_name: "Fishburne",
      age: 62,
      nationality: "American",
    },
    {
      first_name: "Carrie-Anne",
      last_name: "Moss",
      age: 56,
      nationality: "Canadian",
    },
    {
      first_name: "Hugo",
      last_name: "Weaving",
      age: 64,
      nationality: "British",
    },
    { first_name: "Tom", last_name: "Hanks", age: 67, nationality: "American" },
    {
      first_name: "Robin",
      last_name: "Wright",
      age: 58,
      nationality: "American",
    },
    {
      first_name: "Gary",
      last_name: "Sinise",
      age: 69,
      nationality: "American",
    },
    {
      first_name: "Sally",
      last_name: "Field",
      age: 77,
      nationality: "American",
    },
    {
      first_name: "Elijah",
      last_name: "Wood",
      age: 43,
      nationality: "American",
    },
    {
      first_name: "Ian",
      last_name: "McKellen",
      age: 85,
      nationality: "British",
    },
    {
      first_name: "Viggo",
      last_name: "Mortensen",
      age: 65,
      nationality: "American",
    },
    {
      first_name: "Orlando",
      last_name: "Bloom",
      age: 47,
      nationality: "British",
    },
    { first_name: "Brad", last_name: "Pitt", age: 60, nationality: "American" },
    {
      first_name: "Edward",
      last_name: "Norton",
      age: 54,
      nationality: "American",
    },
    {
      first_name: "Helena",
      last_name: "Bonham Carter",
      age: 58,
      nationality: "British",
    },
    {
      first_name: "Jared",
      last_name: "Leto",
      age: 52,
      nationality: "American",
    },
    {
      first_name: "Robert",
      last_name: "De Niro",
      age: 80,
      nationality: "American",
    },
    {
      first_name: "Ray",
      last_name: "Liotta",
      age: 67,
      nationality: "American",
    },
    { first_name: "Joe", last_name: "Pesci", age: 81, nationality: "American" },
    {
      first_name: "Lorraine",
      last_name: "Bracco",
      age: 69,
      nationality: "American",
    },
    {
      first_name: "Jodie",
      last_name: "Foster",
      age: 61,
      nationality: "American",
    },
    {
      first_name: "Anthony",
      last_name: "Hopkins",
      age: 86,
      nationality: "British",
    },
    {
      first_name: "Scott",
      last_name: "Glenn",
      age: 83,
      nationality: "American",
    },
    {
      first_name: "Ted",
      last_name: "Levine",
      age: 67,
      nationality: "American",
    },
  ],
  movieCast: [
    { movie: "Interstellar", actor: "Matthew McConaughey" },
    { movie: "Interstellar", actor: "Anne Hathaway" },
    { movie: "Interstellar", actor: "Jessica Chastain" },
    { movie: "Interstellar", actor: "Michael Caine" },

    { movie: "The Dark Knight", actor: "Christian Bale" },
    { movie: "The Dark Knight", actor: "Heath Ledger" },
    { movie: "The Dark Knight", actor: "Aaron Eckhart" },
    { movie: "The Dark Knight", actor: "Gary Oldman" },

    { movie: "Inception", actor: "Leonardo DiCaprio" },
    { movie: "Inception", actor: "Joseph Gordon-Levitt" },
    { movie: "Inception", actor: "Ellen Page" },
    { movie: "Inception", actor: "Tom Hardy" },

    { movie: "Pulp Fiction", actor: "John Travolta" },
    { movie: "Pulp Fiction", actor: "Samuel L. Jackson" },
    { movie: "Pulp Fiction", actor: "Uma Thurman" },
    { movie: "Pulp Fiction", actor: "Bruce Willis" },

    { movie: "The Shawshank Redemption", actor: "Tim Robbins" },
    { movie: "The Shawshank Redemption", actor: "Morgan Freeman" },
    { movie: "The Shawshank Redemption", actor: "Bob Gunton" },
    { movie: "The Shawshank Redemption", actor: "William Sadler" },

    { movie: "The Godfather", actor: "Marlon Brando" },
    { movie: "The Godfather", actor: "Al Pacino" },
    { movie: "The Godfather", actor: "James Caan" },
    { movie: "The Godfather", actor: "Robert Duvall" },

    { movie: "The Matrix", actor: "Keanu Reeves" },
    { movie: "The Matrix", actor: "Laurence Fishburne" },
    { movie: "The Matrix", actor: "Carrie-Anne Moss" },
    { movie: "The Matrix", actor: "Hugo Weaving" },

    { movie: "Forrest Gump", actor: "Tom Hanks" },
    { movie: "Forrest Gump", actor: "Robin Wright" },
    { movie: "Forrest Gump", actor: "Gary Sinise" },
    { movie: "Forrest Gump", actor: "Sally Field" },

    { movie: "The Lord of the Rings", actor: "Elijah Wood" },
    { movie: "The Lord of the Rings", actor: "Ian McKellen" },
    { movie: "The Lord of the Rings", actor: "Viggo Mortensen" },
    { movie: "The Lord of the Rings", actor: "Orlando Bloom" },

    { movie: "Fight Club", actor: "Brad Pitt" },
    { movie: "Fight Club", actor: "Edward Norton" },
    { movie: "Fight Club", actor: "Helena Bonham Carter" },
    { movie: "Fight Club", actor: "Jared Leto" },

    { movie: "Goodfellas", actor: "Robert De Niro" },
    { movie: "Goodfellas", actor: "Ray Liotta" },
    { movie: "Goodfellas", actor: "Joe Pesci" },
    { movie: "Goodfellas", actor: "Lorraine Bracco" },

    { movie: "The Silence of the Lambs", actor: "Jodie Foster" },
    { movie: "The Silence of the Lambs", actor: "Anthony Hopkins" },
    { movie: "The Silence of the Lambs", actor: "Scott Glenn" },
    { movie: "The Silence of the Lambs", actor: "Ted Levine" },
  ],
};
