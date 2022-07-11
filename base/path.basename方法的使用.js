const path = require("path");
const fpath = "./a/b/c/v/indexedDB.html";
const newName = path.basename(fpath, ".html");
const fullName = path.basename(fpath);
console.log(newName);
console.log(fullName);
