import { CBOR } from "https://js.sabae.cc/CBOR.js";

const CTYPE_CBOR = "application/cbor";

export const reqjson = async (req) => {
  if (req.method == "POST" || req.method == "PUT") {
    const ctype = req.headers.get("Content-Type");
    if (ctype == CTYPE_CBOR) {
      return CBOR.decode(new Uint8Array(await req.arrayBuffer()));
    }
    return await req.json();
  } else if (req.method == "DELETE") {
    return null; // no requets
  } else if (req.method === "GET") {
    const n = req.url.indexOf("?");
    const sjson = decodeURIComponent(req.url.substring(n + 1));
    try {
      return JSON.parse(sjson);
    } catch (e) {
      return sjson;
    }
  }
  return null;
};
