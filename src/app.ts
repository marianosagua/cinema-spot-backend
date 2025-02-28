import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/app.routes";
import { Server } from "./presentation/server";

/**
 * Entry point of the application that initializes and starts the server.
 *
 * This function creates an instance of the server using the port specified in the environment variables and the routes defined by the application's routing module.
 * Once the server instance is constructed, it immediately starts listening for incoming connections.
 *
 * @remarks
 * Ensure that the environment variables and route configurations are correctly set up before calling this function.
 *
 * @example
 * ```typescript
 * // Initialize and start the server
 * main();
 * ```
 */
const main = () => {
  const server = new Server({ port: envs.port, routes: AppRoutes.getRoutes() });
  server.start();
};

main();
