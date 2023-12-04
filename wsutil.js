import { handleWeb } from "./handleWeb.js";
import { handleAPI } from "./handleAPI.js";
export { handleWeb, handleAPI };
export { resjson, rescbor, rescors } from "./resjson.js";
import { program } from 'https://code4fukui.github.io/commander-es/index.js';

program
  .version("0.0.3")
  .argument("[port number]", "port number of the server socket")
  .option("--ipv4", "hostname become 0.0.0.0 instead of [::]")
  .parse();

const options = program.opts();

const hostname = options.ipv4 ? "0.0.0.0" : "[::]";

export const serve = (handle, defaultPort = 8000) => { // func(req, path, conninfo)
  const port = parseInt((program.processedArgs ? program.processedArgs[0] : null) || defaultPort);
  const options = {
    port,
    hostname,
  };
  const server = Deno.serve(options, async (req, conninfo) => {
    const path = new URL(req.url).pathname;
    return await handle(req, path, conninfo);
  });
  return server;
};

export const serveAPI = (apipath, func, defaultPort = 8000) => { // func(param, req, path, conninfo)
  const server = serve(async (req, path, conninfo) => {
    if (req.method == "OPTIONS") {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "text/plain",
      };
      return new Response("ok", { headers });
    }
    if (path.startsWith(apipath)) {
      return await handleAPI(func, req, path, conninfo);
    }
    return await handleWeb("static", req, path, conninfo);
  }, defaultPort);
  return server;
};
