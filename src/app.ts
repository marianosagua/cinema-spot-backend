/**
 * Entry point for the CinemaSpot backend application.
 *
 * This file bootstraps the Express server application by initializing the server
 * with the appropriate configuration and routes.
 *
 * @file This file is the main entry point that starts the CinemaSpot backend server.
 * @author Mariano Sagua
 */

import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/app.routes";
import { Server } from "./presentation/server";

/**
 * Initializes and starts the server application.
 *
 * Creates a new Server instance configured with:
 * - Port: Retrieved from environment variables via the envs object
 * - Routes: Configured API routes from the AppRoutes static method
 *
 * @function main
 * @returns {void}
 */
const main = () => {
  const server = new Server({ port: envs.port, routes: AppRoutes.getRoutes() });
  server.start();
};

// Bootstrap the application by executing the main function
main();
