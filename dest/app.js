"use strict";

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _UpdateProfile = _interopRequireDefault(require("./lib/UpdateProfile.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// cron.schedule("* * * * * *", () => {
//     console.log("Hello World");
// GitHub APIから言語を取得
// 取得した言語を渡す
(0, _UpdateProfile.default)('OBB a.k.a OJIs'); // });