import morgan, { StreamOptions } from "morgan";

import { config } from "../config";
import { logger } from "../lib/logger";

const stream: StreamOptions = {
  write: (message) =>
    logger.http(message.substring(0, message.lastIndexOf("\n"))),
};

const _skip = () => {
  const env = config.NODE_ENV;
  return env !== "development";
};

// Build the morgan middleware
const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

export { requestLogger };
