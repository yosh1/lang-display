// import cron from "node-cron";
import updateProfile from './lib/UpdateProfile.js';
import github from './lib/GitHubApi.js';
import express from './lib/Express.js';

// cron設定
// cron.schedule("* * * * * *", () => {
//     console.log("Hello World");

// GitHub APIから言語を取得
const userId = 'tenmakamatani';
// Max - > array const userId = 'fabpot'
const langName = github(userId);
updateProfile('よし.' + langName);

// });

express();