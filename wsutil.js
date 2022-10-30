import { serve as _serve } from "https://deno.land/std@0.157.0/http/server.ts";
import { handleWeb } from "./handleWeb.js";
import { handleAPI } from "./handleAPI.js";
export { handleWeb, handleAPI };
export { resjson, rescbor, rescors } from "./resjson.js";
import { program } from 'https://code4fukui.github.io/commander-es/index.js';

program
  .version("0.0.2")
  .argument("[port number]", "port number of the server socket")
  .option("--ipv4", "hostname become localhost instead of [::]")
  .parse();

const options = program.opts();

const port = parseInt((program.processedArgs ? program.processedArgs[0] : null) || 8000);
const hostname = options.ipv4 ? "localhost" : "[::]";

export const serve = (handle) => { // func(req, path, conninfo)
  _serve(async (req, conninfo) => {
    const path = new URL(req.url).pathname;
    return await handle(req, path, conninfo);
  }, { port, hostname });
};

export const serveAPI = (apipath, func) => { // func(param, req, path, conninfo)
  serve(async (req, path, conninfo) => {
    if (path.startsWith(apipath)) {
      return await handleAPI(func, req, path, conninfo);
    }
    return await handleWeb("static", req, path, conninfo);
  });
};
