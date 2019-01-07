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

          let resultCommitArray = uniqueLastDayPushedRepositories.filter(item => item.commitCount == maxLastDayPushedRepositories)
          let resultUrlArray = []

          // console.log(getResultCommitArray);
          // [ { url: 'https://api.github.com/repos/yoshi1125hisa/ruby-on-rails-tutorial', commitCount: 2 } ]
          for( let i=0; i < resultCommitArray.length; i++){
            resultUrlArray.push(resultCommitArray[i].url.replace("https://api.github.com/","") + "/languages")
          }
          getLangName(resultUrlArray)
          console.log(resultUrlArray)    // URL Array
        }
      } else {
          console.error(`Status: ${res.status}\n${res.statusText}`);
        }
    }).catch( err => {
      console.error(err)
    })
}

const getLangName = (resultUrl) => {
  for (let i=0;i < resultUrl.length; i++){
  axios.get(resultUrl[i])
    .then(res => {
      if (res.status === 200) {
        const resultBestCommitlang = Object.keys(res.data)[0]
        const resultBestCommitNum = res.data[Object.keys(res.data)[0]]
        /*{ HTML: 22779, JavaScript: 12130, CSS: 8821 }*/
        console.log(resultBestCommitlang + ":" + resultBestCommitNum)
      }else{
       console.error(`Status: ${res.status}\n${res.statusText}`);
      }
    }).catch( err => {
      console.error(err)
    })
  }
}
