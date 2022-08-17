import http from "http";
import index from "../index";
import { logger } from "../lib/logger";
import { config } from "../config";

const port = (function normalizePort(val: string) {
  const portNumber = parseInt(val, 10);

  if (isNaN(portNumber)) {
    // named pipe
    return val;
  }

  if (portNumber >= 0) {
    // port number
    return portNumber;
  }

  logger.error("No port number assigned or out of range");
  process.exit(1);
})(config.PORT);

index.set("port", port);
const server = http.createServer(index);

void (async function initServer() {
  try {
    // SERVER
    server.listen(port);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();

server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = server.address() || "";
  const typeofAddr = typeof addr === "string";
  const bind = typeofAddr ? `pipe ${port}` : `port ${port}`;
  logger.debug(`Listening on ${bind}`);
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = `${typeof port === "string" ? "Pipe" : "Port"} ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
