import "dotenv/config";
import { get } from "env-var";

export const envs = {
  port: get("PORT").required().asPortNumber(),
  app_url: get("APP_URL").required().asString(),
  jwt_secret_key: get("JWT_SECRET_KEY").required().asString(),
  frontend_url: get("FRONTEND_URL")
    .default("https://cinemaspot.vercel.app")
    .asString(),
  resend: get("RESEND_API_KEY").asString(),
};
