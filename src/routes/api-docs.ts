import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { swaggerDocsOptions } from "../services/swagger/swagger.config";


const api_docs = Router();

api_docs.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDoc(swaggerDocsOptions))
);

export default api_docs;