import { CBOR } from "https://js.sabae.cc/CBOR.js";
import * as sec from "https://code4fukui.github.io/sec.js/sec.js";
import { Base64URL } from "https://code4fukui.github.io/Base64URL/Base64URL.js";

const CTYPE_CBOR = "application/cbor";
const CTYPE_JWT = "application/jwt";

export const reqjson = async (req) => {
  if (!req) {
    return null;
  }
  if (req.method == "POST" || req.method == "PUT") {
    const ctype = req.headers.get("Content-Type");
    const bin = new Uint8Array(await req.arrayBuffer());
    if (ctype == CTYPE_CBOR) {
      const sign = Base64URL.decode(req.headers.get("X-Sign"));
      if (sign) {
        const pubkey = Base64URL.decode(req.headers.get("X-Public-Key"));
        const verify = sec.verify(sign, pubkey, bin);
        if (!verify) return null;
      }
      return CBOR.decode(bin);
    } else if (ctype == CTYPE_JWT) {
      return await req.text(); // header.payload.signature
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
