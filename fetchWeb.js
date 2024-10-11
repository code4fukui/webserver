import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { handleAPI } from "./handleAPI.js";
import { checkIP } from "./checkIP.js";

const fetchAPI = async (req, conn, apihandler, postonly) => { // apihandler = (param, req, path, conn) => {};
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
      return new Response("Unauthorized", { status: 401 });
    }
    return serveFile(req, fn);
  } catch (e) {
    console.log("in apihandler", e);
  }
  return new Response("Internal Server Error", { status: 500 });
};

export const fetchWeb = (apihandler, postonly) => ({ fetch: async (req, conn) => await fetchAPI(req, conn, apihandler, postonly) });
