import { Router } from "express";
import { launchHealthCheck } from "../controllers/healthCheck.controller";

const healthCheckRouter = Router();
const ROUTE = '/healthCheck';


healthCheckRouter.get(ROUTE, launchHealthCheck);

export default healthCheckRouter;