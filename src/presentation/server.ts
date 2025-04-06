/**
 * Express server configuration module for CinemaSpot backend application.
 *
 * This module defines the Server class which encapsulates the Express application setup,
 * configures necessary middleware, view engine, and handles HTTP request listening.
 *
 * @module server
 */
import express from "express";
import { Router } from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import path from "path";

/**
 * Configuration options for the Server instance.
 *
 * @interface Options
 * @property {number} port - The port number on which the server will listen.
 * @property {Router} routes - The Express Router instance containing the application routes.
 */
interface Options {
  port: number;
  routes: Router;
}

/**
 * Represents an HTTP server for the CinemaSpot backend application.
 *
 * The Server class is responsible for configuring and starting an Express-based web server.
 * It sets up essential middleware such as CORS handling, JSON and URL-encoded parsers, and
 * configures the view engine to use Handlebars (.hbs). Additionally, it mounts the provided
 * routing definitions and initiates the listener on the specified port.
 */
export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  /**
   * Creates a new Server instance.
   *
   * @param {Options} options - Configuration options for the server
   * @param {number} options.port - The port number on which the server will listen
   * @param {Router} options.routes - The Express Router instance containing the application routes
   */
  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  /**
   * Starts the server by applying middleware, configuring the view engine, mounting routes,
   * and beginning to listen on the provided port.
   *
   * This method applies the following middleware:
   *   - CORS middleware via cors()
   *   - JSON parser via express.json()
   *   - URL-encoded parser via express.urlencoded({ extended: true })
   *
   * It also sets the views directory and configures Handlebars as the templating engine before
   * mounting the defined routes. Once the server begins listening on the configured port, it logs a
   * confirmation message to the console.
   *
   * @returns {void}
   */
  start(): void {
    this.app.use(cors());

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.set("views", path.join(__dirname, "views"));
    this.app.engine("hbs", engine({ extname: ".hbs", defaultLayout: false }));
    this.app.set("view engine", "hbs");

    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
