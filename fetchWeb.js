import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { handleAPI } from "./handleAPI.js";
import { checkIP } from "./checkIP.js";
import { saveAppendLog } from "./saveAppendLog.js";

const access = async (req, conn, apihandler, postonly) => {
  try {
    const url = new URL(req.url);
    const path0 = url.pathname;
    const ip = conn.remoteAddr.hostname;
    const path = path0.endsWith("/") ? path0 + "index.html" : path0;
    const fn = "static/" + path.substring(1);
    const write = req.method != "GET";
    if (!await checkIP(ip, fn, write)) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (apihandler && path0.startsWith("/api/")) {
      return handleAPI(apihandler, req, path0, conn, postonly);
    }
    if (path.indexOf("..") >= 0 || path[1] == "/") {
      return new Response("not found", { status: 404 });
    }
    return serveFile(req, fn);
  } catch (e) {
    console.log("in apihandler", e);
  }
  return new Response("Internal Server Error", { status: 500 });
};

const fetchAPI = async (req, conn, apihandler, postonly) => { // apihandler = (param, req, path, conn) => {};
  const res = await access(req, conn, apihandler, postonly);
  await saveAppendLog(req, conn, res);
  return res;
};

export const fetchWeb = (apihandler, postonly) => ({ fetch: async (req, conn) => await fetchAPI(req, conn, apihandler, postonly) });
