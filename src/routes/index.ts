import { Router } from "express";
import healthCheckRouter from "./healthCheck";


const router = Router();

router.use(healthCheckRouter);


export default router;