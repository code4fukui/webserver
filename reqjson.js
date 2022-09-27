export const reqjson = async (req) => {
  if (req.method === "POST" || req.method == "PUT") {
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
