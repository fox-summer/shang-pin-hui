const fs = require("fs");
fs.readFile("./result.txt", "utf8", (err, dataStr) => {
  if (err) {
    console.log("读取文件失败！" + err.message);
  } else {
    var newArr = [];
    newArr = dataStr.split(" ");
    newArr.forEach((item) => {
      item.replace("=", ":");
    });
    var newStr = newArr.join("\n");
  }
  fs.writeFile(__dirname + "/result1.txt", newStr, (err) => {
    if (err) {
      console.log("写入文件失败" + err.message);
    }
  });
});
