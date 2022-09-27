export const resjson = (body) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
  const res = new Response(JSON.stringify(body, null, 2), headers);
  console.log(res);
  return res;
};
