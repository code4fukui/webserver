// check .conf file

export const checkIP = async (ip, fn) => {
  const n = fn.lastIndexOf("/");
  const dir = fn.substring(0, n);
  const fname = fn.substring(n + 1);
  if (fname[0] == ".") return false;
  try {
    const conf = await Deno.readTextFile(dir + "/.conf");
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
      }
    }
  } catch (e) {
  }
  return true;
};
