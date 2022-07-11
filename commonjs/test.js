const TIME = require("./dateformat.js");
const dt = new Date();
console.log(dt);
console.log(TIME.dateFormat(dt));

// 包
const moment = require("moment");
const dt1 = moment().format("YYYY-MM-DD HH:mm:ss");
console.log(dt1);
