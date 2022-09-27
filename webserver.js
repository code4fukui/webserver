import { serve as _serve } from "https://deno.land/std@0.157.0/http/server.ts";
export { handleWeb } from "./handleWeb.js";
export { resjson } from "./resjson.js";
export { reqjson } from "./reqjson.js";

export const serve = (handle) => {
  const port = Deno.args[0] ? parseInt(Deno.args[0]) : 8000;
  const hostname = "[::]";
  _serve(handle, { port, hostname })
};
