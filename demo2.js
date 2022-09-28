//import { serve, handleWeb, handleAPI } from "https://code4fukui.github.io/webserver/webserver.js";
import { serve, handleWeb, handleAPI, rescors } from "./webserver.js";

serve(async (req, path) => {
  if (path == "/api") {
    return await handleAPI(req, (param) => ({ response: "OK", param }));
  } else if (path == "/test") {
    return rescors("test", "text/html");
  }
  return await handleWeb(req, "static");
});
