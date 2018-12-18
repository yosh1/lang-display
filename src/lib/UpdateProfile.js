require("dotenv").config();
import twit from "twit";
import configTwit from '../config-twit.js'

const Twit = require('twit');

// const T = new Twit({
//   consumer_key: '...',
//   consumer_secret: '...',
//   access_token: '...',
//   access_token_secret: '...',
//   timeout_ms: 60*1000,  
//   strictSSL: true,  
// });

const T = new Twit(configTwit);

T.post('account/update_profile', { name: displayName }, (err, data, res) => {});

module.exports = displayName => {

};