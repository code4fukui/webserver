import * as sec from "https://code4fukui.github.io/sec.js/sec.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";
import { Base64URL } from "https://code4fukui.github.io/Base64URL/Base64URL.js";

export const fetchSignedCBOR = async (url, req, prikey, pubkey) => {
  const body = CBOR.encode(req);
  const sign = sec.sign(prikey, body);
  const opt = req ? {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/cbor",
      "Accept": "application/cbor",
      "X-Sign": Base64URL.encode(sign),
      "X-Public-Key": Base64URL.encode(pubkey),
    },
    body,
  } : null;
  const res = new Uint8Array(await (await fetch(url, opt)).arrayBuffer());
  return CBOR.decode(res);
};
