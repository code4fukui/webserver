import * as t from "https://deno.land/std/testing/asserts.ts";
import { CBOR } from "https://js.sabae.cc/CBOR.js";

// deno run -A demo1.js 8800

Deno.test("json -> json", async () => {
  const p = { test: "abc", n: 123 };
  const method = "POST";
  const body = JSON.stringify(p);
  const r = await (await fetch("http://[::]:8800/api/", { method, body })).json();
  t.assertEquals(r, { response: "OK", param: p });
});
Deno.test("json -> cbor", async () => {
  const p = { test: "abc", n: 123 };
  const method = "POST";
  const body = JSON.stringify(p);
  const headers = { "Accept": "application/cbor" };
  const r = CBOR.decode(new Uint8Array(await (await fetch("http://[::]:8800/api/", { method, body, headers })).arrayBuffer()));
  t.assertEquals(r, { response: "OK", param: p });
});
Deno.test("cbor -> cbor", async () => {
  const p = { test: "abc", n: 123 };
  const method = "POST";
  const body = CBOR.encode(p);
  const headers = { "Accept": "application/cbor", "Content-Type": "application/cbor" };
  const r = CBOR.decode(new Uint8Array(await (await fetch("http://[::]:8800/api/", { method, body, headers })).arrayBuffer()));
  t.assertEquals(r, { response: "OK", param: p });
});
Deno.test("cbor -> json", async () => {
  const p = { test: "abc", n: 123 };
  const method = "POST";
  const body = CBOR.encode(p);
  const headers = { "Accept": "application/json", "Content-Type": "application/cbor" };
  const r = await (await fetch("http://[::]:8800/api/", { method, body, headers })).json()
  t.assertEquals(r, { response: "OK", param: p });
});
Deno.test("static web access", async () => {
  const r = await (await fetch("http://[::]:8800/")).text();
  t.assertEquals(r, "test");
});
