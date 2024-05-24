import { serveWeb } from "./serveWeb.js";

serveWeb((param, req, path, conn) => {
  return "req param: " + JSON.stringify(param);
});
