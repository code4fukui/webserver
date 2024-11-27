// check .conf file

const readConf = async (dir) => {
  for (;;) {
    try {
      const conf = await Deno.readTextFile(dir + "/.conf");
      return conf;
    } catch (e) {
    }
    const n = dir.lastIndexOf("/");
    if (n < 0) break;
    dir = dir.substring(0, n);
  }
  return null;
};

export const checkIP = async (ip, fn, writemode) => {
  const n = fn.lastIndexOf("/");
  const dir = fn.substring(0, n);
  const fname = fn.substring(n + 1);
  if (fname[0] == ".") return false;
  const conf = await readConf(dir);
  if (!conf) return true;
  const ss = conf.split("\n").map(i => {
    const n = i.indexOf("#");
    if (n < 0) return i.trim();
    return i.substring(0, n).trim();
  });
  const deny1 = `deny '${ip}';`;
  const allow1 = `allow '${ip}';`;
  for (const s of ss) {
    if (s == "deny all;") {
      return false;
    } else if (s == "allow all;") {
      return true;
    } else if (s == deny1) {
      return false;
    } else if (s == allow1) {
      return true;
    } else if (writemode && s == "write all;") {
      return true;
    } else if (!writemode && s == "read all;") {
      return true;
    }
  }
  return true;
};
