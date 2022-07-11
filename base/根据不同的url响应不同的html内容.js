const http = require("http");
const server = http.createServer();
server.on("request", (req, res) => {
  const url = req.url;
  const content = "<h1>404 is not found</h1>";
  res.setHeader("Content-Type", "text/html ;charset=utf-8");
  if (url === "/" || url === "/index.html") {
    res.end("<h1>首页</h1>");
  } else if (url === "/about.html") {
    res.end("<h1>关于</h1>");
  } else {
    res.end(content);
  }
});
server.listen(8081, () => {
  console.log("server running at http://127.0.0.1:8081");
});
