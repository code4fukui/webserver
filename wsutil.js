import { serve as _serve } from "https://deno.land/std@0.157.0/http/server.ts";
import { handleWeb } from "./handleWeb.js";
import { handleAPI } from "./handleAPI.js";
export { handleWeb, handleAPI };
export { resjson, rescbor, rescors } from "./resjson.js";

export const serve = (handle) => {
  const port = Deno.args[0] ? parseInt(Deno.args[0]) : 8000;
  const hostname = "[::]";
  _serve(async (req) => {
    const path = new URL(req.url).pathname;
    return await handle(req, path);
  }, { port, hostname });
};

export const serveAPI = (apipath, func) => { // func(param, req)
  serve(async (req, path) => {
    if (path == apipath) {
      return await handleAPI(req, func);
    }
    return await handleWeb(req, "static");
  });
};
