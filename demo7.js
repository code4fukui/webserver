import { serveWeb } from "./serveWeb.js";

const port = Deno.args[0] || 8888;

// http://localhost:8889/api/?a=a

//const postonly = false
const postonly = true;

serveWeb(async (param, req, path, conninfo) => {
  return param;
}, port, postonly);
