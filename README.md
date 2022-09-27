# webserver

utils for webserver with API in Deno.

## Usage

```JavaScript
import { serve, handleWeb, reqjson, resjson } from "https://code4fukui.github.io/webserver/webserver.js";

serve(async (req) => {
  const path = new URL(req.url).pathname;
  if (path == "/api") {
    const q = await reqjson(req);
    console.log("param", q);
    return resjson({ response: "OK", param: q });
  }
  return handleWeb(req, "static");
});
```

Open [http://localhost:8000/](http://localhost:8000/) in your browser.

```bash
mkdir static
cat > static/index.html << EOF
test
EOF
```
