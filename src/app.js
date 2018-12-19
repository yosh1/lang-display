import cron from "node-cron";
import updateProfile from './lib/UpdateProfile.js'
import githubApi from './lib/GitHubApi.js'

// cron.schedule("* * * * * *", () => {
//     console.log("Hello World");

// GitHub APIから言語を取得
githubApi('yoshi1125hisa')

// 取得した言語を渡す
// updateProfile('yoshi.py')

// });
