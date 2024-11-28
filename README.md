# wsutil

wsutil is a utility library for webserver with API in Deno.

## Usage (for Deno 2.x)

simple API server as server.js
```JavaScript
import { fetchWeb } from "https://code4fukui.github.io/wsutil/fetchWeb.js";

export default fetchWeb(async (param, req, path, conninfo) => {
  return { response: "OK", path, param, remoteAddr: conninfo.remoteAddr };
});
```

```sh
deno serve -A --port 8000 --host "[::]" server.js
```

Open [http://localhost:8000/api/](http://localhost:8000/api/) in your browser.

```bash
mkdir static
cat > static/index.html << EOF
test
EOF
```

Open [http://localhost:8000/](http://localhost:8000/) in your browser.

### IP filter

- to edit .conf on directory

```
allow '127.0.0.1'; # allow 127.0.0.1
deny all; # can't access others
```

```
read all; # allow to read
allow '127.0.0.1'; # allow to read and write from 127.0.0.1
deny all; # can't access others
```

```
write all; # allow to write
allow '127.0.0.1'; # allow to read and write from 127.0.0.1
deny all; # can't access others
```

## Usage (for Deno 1.x)

simple API server as server.js
```JavaScript
import { serveWeb } from "https://code4fukui.github.io/wsutil/serveWeb.js";

serveWeb(async (param, req, path, conninfo) => {
  return { response: "OK", path, param, remoteAddr: conninfo.remoteAddr };
});
```

```sh
deno run -A server.js 8000
```

Open [http://localhost:8000/api/](http://localhost:8000/api/) in your browser.

```bash
mkdir static
cat > static/index.html << EOF
test
EOF
```

Open [http://localhost:8000/](http://localhost:8000/) in your browser.
