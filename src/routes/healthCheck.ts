import { Router } from "express";
import { launchHealthCheck } from "../controllers/healthCheck.controller";

const healthCheckRouter = Router();
const ROUTE = '/healthCheck';


/**
 * @swagger
 * /healthcheck:
 *   get:
 *     tags: [Dev]
 *     summary: Health of the API
 *     description: This is an endpoint which lets everyone know that the server is working just fine. Includes simple data in order to make it fast and useful.
 *     responses:
 *      '200':
 *        description: An OK message.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: ok
 */
healthCheckRouter.get(ROUTE, launchHealthCheck);

export default healthCheckRouter;