import { isFileExists } from "./isFileExists.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

const islog = await isFileExists("./log");

export const saveAppendLog = async (req, conninfo, res) => {
  if (!islog) return;
  const remoteAddr = conninfo.remoteAddr.hostname;
  //console.log(remoteAddr);
  const dt = new DateTime();
  const fn = "log/" + dt.day.toStringYMD() + ".log";
  const log = dt.toString() + "," + remoteAddr + "," + res.status + "," + req.url;
  await Deno.writeTextFile(fn, log + "\n", { append: true });
};
