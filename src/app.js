import cron from "node-cron";
import updateProfile from './lib/UpdateProfile.js'
import github from './lib/GitHubApi.js'

// cron.schedule("* * * * * *", () => {
//     console.log("Hello World");

// GitHub APIから言語を取得
// const userId = 'fabpot' // Max - > array
const userId = 'volanthers' // Min -> null
const languageName = github(userId)


// 取得した言語を渡す
// updateProfile('yoshi.py')

// });
