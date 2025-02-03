import express from "express";
import { Router } from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import path from "path";

interface Options {
  port: number;
  routes: Router;
}

/**
 * Represents an HTTP server for the Movie Reservation System using the Express framework.
 *
 * The Server class is responsible for configuring and starting an Express-based web server.
 * It sets up essential middleware such as CORS handling, JSON and URL-encoded parsers, and
 * configures the view engine to use Handlebars (.hbs). Additionally, it mounts the provided
 * routing definitions and initiates the listener on the specified port.
 *
 * @remarks
 * Instantiate this class with an options object containing the server's port and a Router instance
 * with the application's routes. The server will automatically apply middleware, configure the view engine,
 * and start listening once the start() method is invoked.
 *
 * @param options - An object containing the configuration settings:
 *   - port: The port number on which the server will listen.
 *   - routes: The Express Router instance containing the application routes.
 *
 * @example
 * ```typescript
 * import express, { Router } from 'express';
 * import { Server } from './server';
 *
 * const routes: Router = express.Router();
 * // Define your routes here.
 *
 * const server = new Server({ port: 3000, routes });
 * server.start();
 * ```
 */

/**
 * Starts the server by applying middleware, configuring the view engine, mounting routes,
 * and beginning to listen on the provided port.
 *
 * @remarks
 * This method applies the following middleware:
 *   - CORS middleware via cors()
 *   - JSON parser via express.json()
 *   - URL-encoded parser via express.urlencoded({ extended: true })
 *
 * It also sets the views directory and configures Handlebars as the templating engine before
 * mounting the defined routes. Once the server begins listening on the configured port, it logs a
 * confirmation message to the console.
 *
 * @fires Logs a confirmation message to the console indicating the server is running.
 */
export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

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
