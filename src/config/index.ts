import "dotenv/config";

export const config = {
  IS_LOCAL: process.env.IS_LOCAL === "true" ? true : false,
  PORT: process.env.PORT || "3000",
  NODE_ENV: process.env.NODE_ENV || "development",
  APP_VERSION: process.env.npm_package_version || "0.0.0",
  SERVER_URL: process.env.SERVER_URL || "dev.flightapi.com",
};
