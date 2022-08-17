import swaggerJsDoc from "swagger-jsdoc";

import { config } from "../../config";

export const swaggerDocsOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Flight Tracker API",
      version: config.APP_VERSION,
      description: `<h3 style="margin-bottom:0">This is a REST API developed by Abraham Ramirez</h3>`,
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: "Local server",
      },
      {
        url: `https://${config.SERVER_URL}`,
        description: "Dev server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts", "./routes/**/*.js"],
};
