import { CBOR } from "https://js.sabae.cc/CBOR.js";

export const rescors = (body, ctype) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": ctype,
  };
  const res = new Response(body, headers);
  return res;
};

export const resjson = (body) => {
  return rescors(JSON.stringify(body, null, 2), "application/json");
};

export const rescbor = (body) => {
  return rescors(CBOR.encode(body), "application/cbor");
};
