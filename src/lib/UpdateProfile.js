require("dotenv").config();
import twit from "twit";

const Twit = require('twit');

const T = new Twit({
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...',
  timeout_ms: 60*1000,  
  strictSSL: true,  
});

T.post('account/update_profile', { name: displayName }, (err, data, res) => {});

module.exports = displayName => {

};