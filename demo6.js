//import { serveAPI } from "https://code4fukui.github.io/wsutil/wsutil.js";
import { serveAPI } from "./wsutil.js";
import { fetchSignedCBOR } from "./fetchSignedCBOR.js";
import * as sec from "https://code4fukui.github.io/sec.js/sec.js";

const prikey = sec.prikey();
const pubkey = sec.pubkey(prikey);

const port = Deno.args[0] || 8888;

const server = serveAPI("/api", async (param, req, path, conninfo) => {
  return { response: "OK", param };
}, port);

// shutdown after 3 sec
setTimeout(async () => {
  const res = await fetchSignedCBOR("http://localhost:8888/api/test", "abc", prikey, pubkey);
  console.log(res);
}, 3000);
