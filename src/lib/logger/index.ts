import winston from "winston";

import { config } from "../../config";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = config.NODE_ENV === "development" ? "debug" : "http";

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "cyan",
};

winston.addColors(colors);

interface TransformableInfo {
  timestamp?: string;
  level: string;
  message: string;
}

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: config.IS_LOCAL }),
  winston.format.printf(
    ({ timestamp, level: winstonLevel, message }: TransformableInfo) => {
      return typeof timestamp === "string"
        ? `${timestamp} ${winstonLevel}: ${message}`
        : `${winstonLevel}: ${message}`;
    }
  )
);

const transports = [new winston.transports.Console()];

export const logger = winston.createLogger({
  level,
  levels,
  format,
  transports,
});
