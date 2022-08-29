import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import ValidationError from "../lib/errors/ValidationError";
import { logger } from "../lib/logger";

const { NODE_ENV, ENDPOINT_NOT_FOUND } = config;

const serverError =
  NODE_ENV === "development"
    ? (error: Error, res: Response) => {
        res.status(500).send(error.message);
      }
    : (_error: Error, res: Response) => {
        res
          .status(500)
          .send({ status: "error", message: "Internal server error" });
      };

export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Validation errors
  // Errors send with ValidationError class
  // will be displayed to the end user
  if (error instanceof ValidationError) {
    return res.status(error.code).send(error.cause);
  }

  if (error.message === ENDPOINT_NOT_FOUND) {
    return res
      .status(404)
      .send({ status: "NotFound", message: "Service not available" });
  }

  // Server Errors
  // Error stack will be shown in development
  // But hidden in non development
  // Log will be sent always
  logger.error(error.stack);
  serverError(error, res);
}
