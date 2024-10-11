import { fetchWeb } from "./fetchWeb.js";

export default fetchWeb(async (param, req, path, conninfo) => {
  return { response: "OK", path, param, remoteAddr: conninfo.remoteAddr };
});
