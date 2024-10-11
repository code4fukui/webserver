import { fetchWeb } from "./fetchWeb.js";

export default fetchWeb(async (param, req, path, conninfo) => {
  return { param, path, remoteAddr: conninfo.remoteAddr };
  //return "Hello API!";
});
