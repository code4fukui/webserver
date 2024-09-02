import { CBOR } from "https://js.sabae.cc/CBOR.js";
import * as sec from "https://code4fukui.github.io/sec.js/sec.js";
import { Base64URL } from "https://code4fukui.github.io/Base64URL/Base64URL.js";

const CTYPE_CBOR = "application/cbor";
const CTYPE_JWT = "application/jwt";

export const reqjson = async (req, postonly) => {
  if (!req) {
    return null;
  }
  if (req.method == "POST" || req.method == "PUT") {
    const ctype = req.headers.get("Content-Type");
    if (ctype == CTYPE_CBOR) {
      const spubkey = req.headers.get("X-Public-Key");
      if (spubkey) {
        const pubkey = Base64URL.decode(spubkey);
        const sign = Base64URL.decode(req.headers.get("X-Sign"));
        const verify = sec.verify(sign, pubkey, bin);
        if (!verify) return null;
      }
      const bin = new Uint8Array(await req.arrayBuffer());
      return CBOR.decode(bin);
    } else if (ctype == CTYPE_JWT) {
      return await req.text(); // header.payload.signature
    }
    return await req.json();
  } else if (req.method == "DELETE") {
    return null; // no requets
  } else if (req.method === "GET" && !postonly) {
    const n = req.url.indexOf("?");
    if (n < 0) return null;
    const sjson = decodeURIComponent(req.url.substring(n + 1));
    try {
      return JSON.parse(sjson);
    } catch (e) {
      return sjson;
    }
  }
  return null;
};
