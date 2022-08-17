import { Router } from "express";
import { config } from "../config";
import healthCheckRouter from "./healthCheck";
import apiDocsRouter from "./api-docs";


const router = Router();

router.use(healthCheckRouter);

if(config.NODE_ENV === "development") {
    router.use(apiDocsRouter);
}


export default router;