# wsutil

wsutil is a utility library for webserver with API in Deno.

## Usage

simple API server as server.js
```JavaScript
import { serveWeb } from "https://code4fukui.github.io/wsutil/serveWeb.js";

serveWeb(async (param, req, path, conninfo) => {
  return { response: "OK", param };
});
```

```sh
deno run -A server.js 8000
```

Open [http://localhost:8000/api/?test](http://localhost:8000/api/?test) in your browser.

```bash
mkdir static
cat > static/index.html << EOF
test
EOF
```

Open [http://localhost:8000/](http://localhost:8000/) in your browser.
