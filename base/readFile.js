const fs = require("fs");

fs.readFile("./1.txt", "utf8", (err, dataStr) => {
  if (err) {
    console.log("读取失败" + err.message);
  } else {
    console.log("读取成功" + dataStr);
  }
});
