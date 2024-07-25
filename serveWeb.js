import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { handleAPI } from "./handleAPI.js";
import { checkIP } from "./checkIP.js";

export const serveWeb = (apihandler = null, port, postonly = true) => { // apihandle = (param, req, path, conn) => {};
  port = port || parseInt(Deno.args[0] || "80");
  const hostname = "[::]"; // for IPv6
  //const addr = hostname + ":" + port;
  //console.log(`http://${addr}/`);
  Deno.serve({ hostname, port }, async (req, conn) => {
    try {
      const url = new URL(req.url);
      const path0 = url.pathname;
      if (apihandler && path0.startsWith("/api/")) {
        return handleAPI(apihandler, req, path0, conn, postonly);
      }
      const path = path0.endsWith("/") ? path0 + "index.html" : path0;
      if (path.indexOf("..") >= 0 || path[1] == "/") return null;
      const fn = "static/" + path.substring(1);
      const ip = conn.remoteAddr.hostname;
      if (!await checkIP(ip, fn)) {
        return null;
      }
      return serveFile(req, fn);
    } catch (e) {
      console.log("in handler", e);
    }
  });
};
