import "dotenv/config";
import { dbConnection } from "../lib/dbConnection";

const IS_LOCAL = process.env.IS_LOCAL === "true" ? true : false;
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "";
const DB_NAME = "flightAPI";

export const config = {
  IS_LOCAL,
  PORT: process.env.PORT || "3000",
  NODE_ENV: process.env.NODE_ENV || "development",
  ENDPOINT_NOT_FOUND: "ENDPOINT_NOT_FOUND" as const,
  APP_VERSION: process.env.npm_package_version || "0.0.0",
  AUTH_SECRET: process.env.AUTH_SECRET,
  SALT_ROUNDS: 10, // These salt rounds help us encrypt passwords.
  SERVER_URL: process.env.SERVER_URL || "dev.flightapi.com",
  db: {
    DATABASE_ENDPOINT: dbConnection.buildUri(
      { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST },
      IS_LOCAL
    ),
    // CONNECTION_OPTIONS: dbConnection.buildConnectionOptions(PEM_FILE, IS_LOCAL),
  },
};
