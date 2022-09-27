//import { serve, handleWeb, reqjson, resjson } from "https://code4fukui.github.io/webserver/webserver.js";
import { serve, handleWeb, reqjson, resjson } from "./webserver.js";

serve(async (req) => {
  const path = new URL(req.url).pathname;
  if (path == "/api") {
    const q = await reqjson(req);
    console.log("param", q);
    return resjson({ response: "OK", param: q });
  }
  return handleWeb(req, "static");
});
