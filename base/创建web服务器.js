const http = require("http");
const server = http.createServer();
server.on("request", (req, res) => {
  const url = req.url;
  const method = req.method;
  const str = `您的请求地址是 ${url}+,and request method is ${method}`;
  console.log(str);
  res.setHeader("Content-Type", "text/html;charset=utf-8"); //防止中文乱码
  res.end(str);
});
server.listen(8080, () => {
  console.log("server running at http://127.0.0.1:8080");
});
