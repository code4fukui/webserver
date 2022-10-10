//import { serve, handleWeb, handleAPI } from "https://code4fukui.github.io/wsutil/wsutil.js";
import { serve, handleWeb, handleAPI, rescors } from "./wsutil.js";

serve(async (req, path, conninfo) => {
  console.log(req);
  if (path == "/api") {
    return await handleAPI((param, req, path, conninfo) => ({ response: "OK", param, req, path, conninfo }), req, path, conninfo);
  } else if (req.path == "/test") {
    return rescors("test", "text/html");
  }
  return await handleWeb("static", req, path, conninfo);
});
