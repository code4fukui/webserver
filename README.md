# wsutil

wsutil is a utility library for webserver with API in Deno.

## Usage

simple API server
```JavaScript
import { serveAPI } from "https://js.sabae.cc/wsutil.js";

serveAPI("/api/", async (param, req, path, conninfo) => {
  return { response: "OK", param };
});
```

Open [http://localhost:8000/api](http://localhost:8000/api) in your browser.

flexible version
```JavaScript
import { serve, handleWeb, handleAPI, rescors } from "https://js.sabae.cc/wsutil.js";

serve(async (req, path, conninfo) => {
  if (path == "/api/") {
    return await handleAPI(async (param, req, path, conninfo) => {
      return { response: "OK", param };
    }, req, path, conninfo);
  } else if (path == "/test") {
    return rescors("test", "text/html");
  }
  return await handleWeb("static", req, path, conninfo);
});
```

```bash
mkdir static
cat > static/index.html << EOF
test
EOF
```
