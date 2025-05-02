/**
 * app.ts - Punto de entrada principal de la aplicación CinemaSpot Backend
 *
 * Este archivo es responsable de inicializar el servidor de la aplicación.
 * Importa las configuraciones necesarias y arranca el servidor HTTP
 * con las rutas definidas en el sistema.
 */

import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/app.routes";
import { Server } from "./presentation/server";

/**
 * Función principal que inicializa la aplicación
 *
 * @description Crea una instancia del servidor con la configuración del puerto
 * desde las variables de entorno y configura las rutas de la aplicación.
 * Finalmente inicia el servidor para comenzar a escuchar peticiones.
 */
const main = () => {
  const server = new Server({ port: envs.port, routes: AppRoutes.getRoutes() });
  server.start();
};

// Ejecuta la función principal para iniciar la aplicación
main();
