# webserver

utils for webserver with API in Deno.

## Usage

simple API server
```JavaScript
import { serveAPI } from "https://js.sabae.cc/webserver.js";

serveAPI("/api", async (param) => {
  return { response: "OK", param };
});
```

Open [http://localhost:8000/](http://localhost:8000/api) in your browser.

flexible version
```JavaScript
import { serve, handleWeb, handleAPI, rescors } from "https://js.sabae.cc/webserver.js";

serve(async (req, path) => {
  if (path == "/api") {
    return await handleAPI(req, (param) => ({ response: "OK", param }));
  } else if (path == "/test") {
    return rescors("test", "text/html");
  }
  return await handleWeb(req, "static");
});
```

```bash
mkdir static
cat > static/index.html << EOF
test
EOF
```
