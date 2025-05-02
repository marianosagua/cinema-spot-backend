/**
 * Servidor Express para CinemaSpot Backend
 *
 * Este archivo define la clase Server que configura y ejecuta el servidor Express
 * para la aplicación CinemaSpot. Provee funcionalidad para inicializar el servidor
 * con configuraciones esenciales como middleware CORS, procesamiento de JSON,
 * motor de plantillas Handlebars y enrutamiento.
 */

import express from "express";
import { Router } from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import path from "path";

/**
 * Interfaz que define las opciones de configuración requeridas para el servidor
 *
 * @property port - Número de puerto en el que el servidor escuchará
 * @property routes - Router de Express con todas las rutas definidas de la aplicación
 */
interface Options {
  port: number;
  routes: Router;
}

/**
 * Clase Server que encapsula toda la lógica del servidor Express
 *
 * Esta clase se encarga de configurar y arrancar el servidor web con
 * todas las configuraciones necesarias para el funcionamiento del backend.
 */
export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  /**
   * Constructor que inicializa el servidor con las opciones proporcionadas
   *
   * @param options - Objeto con el puerto y las rutas a configurar
   */
  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  /**
   * Método que inicia el servidor con todas las configuraciones
   *
   * Este método:
   * 1. Configura CORS para permitir peticiones de otros orígenes
   * 2. Configura el middleware para procesar JSON y datos de formularios
   * 3. Configura el motor de plantillas Handlebars para renderizar vistas
   * 4. Registra las rutas definidas en la aplicación
   * 5. Inicia el servidor en el puerto especificado
   */
  start(): void {
    // Configura CORS para permitir peticiones de otros orígenes
    this.app.use(cors());

    // Configura el middleware para procesar JSON y datos de formularios
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Configura el motor de plantillas Handlebars
    this.app.set("views", path.join(__dirname, "views"));
    this.app.engine("hbs", engine({ extname: ".hbs", defaultLayout: false }));
    this.app.set("view engine", "hbs");

    // Registra todas las rutas de la aplicación
    this.app.use(this.routes);

    // Inicia el servidor en el puerto especificado
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
