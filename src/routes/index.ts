import { Router } from "express";
import { config } from "../config";
import healthCheckRouter from "./healthCheck";
import userRoute from "./users/userRoute";
import apiDocsRouter from "./api-docs";

const router = Router();

router.use(healthCheckRouter);
router.use(userRoute);

if (config.NODE_ENV === "development") {
  router.use(apiDocsRouter);
}

export default router;
