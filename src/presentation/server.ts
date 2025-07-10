import dotenv from "dotenv";
import express from "express";
import { Router } from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import path from "path";

// Carga variables de entorno
dotenv.config();

/**
 * Interfaz que define las opciones de configuración requeridas para el servidor
 */
interface Options {
  port: number;
  routes: Router;
}

/**
 * Clase Server que encapsula toda la lógica del servidor Express
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

  /**
   * Método que inicia el servidor con todas las configuraciones
   */
  start(): void {
    // Origen permitido configurado vía .env (ej: https://mi-app.vercel.app)
    const allowedOrigin = process.env.FRONTEND_URL;

    // Configura CORS con origen específico y credenciales
    this.app.use(
      cors({
        origin: allowedOrigin,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    // Habilita preflight en todas las rutas
    this.app.options(
      "*",
      cors({
        origin: allowedOrigin,
        credentials: true,
      })
    );

    // Middleware para procesar JSON y formularios
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Configura el motor de plantillas Handlebars
    this.app.set("views", path.join(__dirname, "views"));
    this.app.engine(
      "hbs",
      engine({ extname: ".hbs", defaultLayout: false })
    );
    this.app.set("view engine", "hbs");

    // Registra todas las rutas de la aplicación
    this.app.use(this.routes);

    // Inicia el servidor en el puerto especificado
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
