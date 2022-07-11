const fs = require("fs");
const path = require("path");
fs.readFile(path.join(__dirname, "/1.txt"), "utf8", (err, dataStr) => {
  if (err) {
    console.log("读取文件失败！" + err.messagee);
  } else {
    console.log(dataStr);
  }
});
