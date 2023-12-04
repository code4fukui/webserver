//import { serveAPI } from "https://code4fukui.github.io/wsutil/wsutil.js";
import { serveAPI } from "./wsutil.js";

const port = Deno.args[0] || 8888;

serveAPI("/api", async (param, req, path, conninfo) => {
  return { response: "OK from " + conninfo.remoteAddr.hostname, param };
}, port);
