import cron from "node-cron";
import updateProfile from './lib/UpdateProfile.js'
import github from './lib/GitHubApi.js'

const test = [
  {
    url: 'https://api.github.com/repos/mongoosejs/mongoose-ttl',
    commitCount: 1
  },
  {
    url: 'https://api.github.com/repos/vkarpov15/legendary-goggles',
    commitCount: 1
  },
  {
    url: 'https://api.github.com/repos/vkarpov15/acquit',
    commitCount: 2
  },
  {
    url: 'https://api.github.com/repos/vkarpov15/acquit',
    commitCount: 1
  },
  {
    url: 'https://api.github.com/repos/vkarpov15/acquit',
    commitCount: 3
  },
  {
    url: 'https://api.github.com/repos/vkarpov15/acquit',
    commitCount: 1
  },
  {
    url: 'https://api.github.com/repos/vkarpov15/mongoose-lean-virtuals',
    commitCount: 1
  }
]

// cron.schedule("* * * * * *", () => {
//     console.log("Hello World");

// GitHub APIから言語を取得
console.log('\n== test ==')
console.log(test)
console.log(`\nlength: ${test.length}`)

const hoge = github(test)

console.log('\n== github(test) ==')
console.log( hoge )
console.log( `\nlength: ${hoge.length}` )


// 取得した言語を渡す
// updateProfile('yoshi.py')

// });
