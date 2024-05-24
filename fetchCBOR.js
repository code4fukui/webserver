import { CBOR } from "https://code4fukui.github.io/CBOR-es/CBOR.js";

export const fetchCBOR = async (url, req) => {
  const opt = req ? {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/cbor",
      "Accept": "application/cbor",
    },
    body: CBOR.encode(req),
  } : null;
  const res = new Uint8Array(await (await fetch(url, opt)).arrayBuffer());
  return CBOR.decode(res);
};
