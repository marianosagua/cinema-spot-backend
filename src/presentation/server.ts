import dotenv from "dotenv";
import express from "express";
import { Router } from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import path from "path";

dotenv.config();

interface Options {
  port: number;
  routes: Router;
}

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
    const allowedOrigin = process.env.FRONTEND_URL;

    this.app.use(
      cors({
        origin: allowedOrigin,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.options(
      "*",
      cors({
        origin: allowedOrigin,
        credentials: true,
      })
    );

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
