//import { serveAPI } from "https://code4fukui.github.io/wsutil/wsutil.js";
import { serveAPI } from "./wsutil.js";

const port = Deno.args[0] || 8888;

const server = serveAPI("/api", async (param, req, path, conninfo) => {
  return { response: "OK", param };
}, port);

// shutdown after 3 sec
setTimeout(async () => {
  await server.shutdown();
}, 3000);
