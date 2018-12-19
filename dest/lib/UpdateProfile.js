"use strict";

var _twit = _interopRequireDefault(require("twit"));

var _configTwit = _interopRequireDefault(require("../config-twit.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

//const Twit = require('twit');
const T = new _twit.default(_configTwit.default);

module.exports = displayName => {
  T.post('account/update_profile', {
    name: displayName
  }, (err, data, res) => {
    if (err) throw err;
    console.log('Success!');
  });
};