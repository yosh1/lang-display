import Axios from 'axios'
import moment, { relativeTimeRounding } from 'moment'


const axios = Axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'lang-display'
  },
  responseType: 'json'
});

const getUniqueRepositories = events => {
  return events.map(event => {
    return {
      url: event.repo.url,
      commitCount: event.payload.size
    }
  })
}

const getLastDayPushedRepositories = events => {
  const lastDay = moment().subtract(moment.duration(1, 'days'))
  const lastDayPushEvents = events.filter(event => moment(event.created_at).date() === lastDay.date())
  return getUniqueRepositories(lastDayPushEvents)
}

const findTargetRepositoryIndexFromArrayWithUndefined = (targetRepository, array) => {
  for (let index = 0; index < array.length; index++) {
    // マッチした要素のIndexを返却する
    if (array[index].url === targetRepository.url) {
      return index
    }
  }
  // マッチしなかったらundefined
  return undefined
}

const removeDuplicationRepositories = repositories => {
  const tempRepos = [ repositories[0] ] // 一個は必ず入ってなくてはいけない
  repositories.shift() // すでに代入したので先頭を削除

  if (repositories.length > 0) {
    // 渡されたrepositoryが2個以上の場合
    let existRepositoryIndexWithUndefined
    repositories.forEach(repository => {
      existRepositoryIndexWithUndefined = findTargetRepositoryIndexFromArrayWithUndefined(repository, tempRepos)

      if (existRepositoryIndexWithUndefined === undefined) {
        tempRepos.push(repository)
      } else {
        tempRepos[existRepositoryIndexWithUndefined].commitCount += repository.commitCount
      }
    })
  }

  return tempRepos
}

module.exports = userName => {

  // Push情報を得るため ｀/events｀ を叩いてEvent一覧を得る
  axios.get(`users/${userName}/events`)
    .then(res => {
      if (res.status === 200) {

        // 更にそのイベント情報から ｀PushEvent｀ だけを抜いた配列
        // 現時点で、どのEventが昨日行われたのかはわからない
        const pushEvents = res.data.filter(event => event.type === 'PushEvent')

        // 昨日PushされたRepositoryだけを抜き出す
        const lastDayPushedRepositories = getLastDayPushedRepositories(pushEvents)
        let uniqueLastDayPushedRepositories;
        let maxLastDayPushedRepositories;

        // unique...Repositories がunidefinedなら
        if(lastDayPushedRepositories === undefined || lastDayPushedRepositories[0] === undefined) {
          console.log("null")
        }else{
          // 重複を削除しつつ、コミット数を計算
          uniqueLastDayPushedRepositories = removeDuplicationRepositories(lastDayPushedRepositories)

          // commitcountが最大のものを抽出
          maxLastDayPushedRepositories = Math.max.apply(null,uniqueLastDayPushedRepositories.map(function(o){return o.commitCount}))

          // const result = Object.keys(uniqueLastDayPushedRepositories).filter((key) => { 
          //   return uniqueLastDayPushedRepositories[key] === maxLastDayPushedRepositories
          //  })

          let getResultCommitArray = uniqueLastDayPushedRepositories.filter(item => item.commitCount == maxLastDayPushedRepositories)
          let getResultUrlArray = []

          // console.log(getResultCommitArray);
          // [ { url: 'https://api.github.com/repos/yoshi1125hisa/ruby-on-rails-tutorial', commitCount: 2 } ]
          for( let i=0; i < getResultCommitArray.length; i++){
            getResultUrlArray.push(getResultCommitArray[i].url)
            getResultCommitArray[i].url.replace("https://api.github.com/",""); // URL置換
          }
  
          if(getResultUrlArray.length === 1){    // もしURLの配列が1個なら
            // getResultCommitArray[0] をGet
          }else{ // ２個以上
            

          }
          
          console.log(getResultUrlArray);    // URL Array
        }

        // console.log(uniqueLastDayPushedRepositories)
        // console.log(maxLastDayPushedRepositories)    // 7
        /* 
        
        null 
        
        or 
        
        [ { url:
          'https://api.github.com/repos/yoshi1125hisa/ruby-on-rails-tutorial',
         commitCount: 2 },
       { url: 'https://api.github.com/repos/yoshi1125hisa/web-ar',
         commitCount: 12 },
       { url: 'https://api.github.com/repos/yoshi1125hisa/web-ar-js',
         commitCount: 1 },
       { url: 'https://api.github.com/repos/y-and-y/y-and-y.github.io',
         commitCount: 4 },
       { url:
          'https://api.github.com/repos/y-and-y/sample-android-app-overlay',
         commitCount: 2 } ] 
         */
  

        // 得たリポのうち、最もコミット数の多いリポを取得

        // 取得したRepoから言語名を取得
        // const getLang = lastDayPushRepoDel.url + "languages"
        } else {
          console.error(`Status: ${res.status}\n${res.statusText}`);
        }
    }).catch( err => {
      console.error(err)
    })
}

const getLangName = () => {
  module.exports = () => {  
  axios.get(repoUrl)
    .then(res => {
      if (res.status === 200) {
      
      }else{
      
      }
    }).catch( err => {
      console.error(err)
    })
  }
}