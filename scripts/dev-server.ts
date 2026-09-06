import http from "http";
import handler from "../api/tree";

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  console.log(`[API Server] Incoming request: ${req.method} ${req.url}`);

  try {
    // Adapter for Node http.IncomingMessage / ServerResponse to work with handler
    const url = new URL(req.url || "/", `http://localhost:${PORT}`);
    const query: Record<string, string> = {};
    url.searchParams.forEach((v, k) => {
      query[k] = v;
    });

    const vercelReq = {
      method: req.method,
      url: req.url,
      query,
      headers: req.headers,
    };

    const vercelRes = {
      setHeader: (k: string, v: string) => res.setHeader(k, v),
      status: (statusCode: number) => {
        res.statusCode = statusCode;
        return {
          send: (body: string) => {
            res.end(body);
          },
          end: () => res.end(),
        };
      },
    };

    await handler(vercelReq, vercelRes);
  } catch (err: any) {
    console.error("[API Server Error]", err);
    res.statusCode = 500;
    res.end(`<svg><text y="20" fill="red">${err.message}</text></svg>`);
  }
});

server.listen(PORT, () => {
  console.log(`\n🌲 Local API Server is live at http://localhost:${PORT}/api/tree?user=nivinvysakh\n`);
});
