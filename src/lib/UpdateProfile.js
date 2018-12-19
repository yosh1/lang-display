require("dotenv").config();

import Twit from "twit";
import configTwit from '../config-twit.js'
//const Twit = require('twit');

const T = new Twit(configTwit);

module.exports = displayName => {
    T.post('account/update_profile', { name: displayName }, (err, data, res) => {
        if (err) throw err
        console.log('Success!')
    });
};