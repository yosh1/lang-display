import Axios from 'axios'
import moment, {
  relativeTimeRounding
} from 'moment'


const axios = Axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'lang-display'
  },
  responseType: 'json'
})

const getUniqueRepos = events => {
  return events.map(event => {
    return {
      url: event.repo.url,
      commitCount: event.payload.size
    }
  })
}

const getYestPushedRepos = events => {
  const Yest = moment().subtract(moment.duration(1, 'days'))
  const YestPushEvents = events.filter(event => moment(event.created_at).date() === Yest.date())
  return getUniqueRepos(YestPushEvents)
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

const removeDuplicationRepos = Repos => {
  const tempRepos = [Repos[0]] // 一個は必ず入ってなくてはいけない
  Repos.shift() // すでに代入したので先頭を削除

  if (Repos.length > 0) {
    // 渡されたrepositoryが2個以上の場合
    let existRepositoryIndexWithUndefined
    Repos.forEach(repository => {
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

        console.log(pushEvents)

        // 昨日PushされたRepositoryだけを抜き出す
        const YestPushedRepos = getYestPushedRepos(pushEvents);
        let uniqueYestPushedRepos;
        let maxYestPushedRepos;

        if (YestPushedRepos === undefined || YestPushedRepos[0] === undefined) {
          console.log("yesterdayPush: null")
        } else {
          uniqueYestPushedRepos = removeDuplicationRepos(YestPushedRepos)
          maxYestPushedRepos = Math.max.apply(null, uniqueYestPushedRepos.map(function (o) {
            return o.commitCount
          }))
          let resultCommitArray = uniqueYestPushedRepos.filter(item => item.commitCount == maxYestPushedRepos)
          let resultUrlArray = []
          for (let i = 0; i < resultCommitArray.length; i++) {
            resultUrlArray.push(resultCommitArray[i].url.replace("https://api.github.com/", "") + "/languages")
          }
          getLangName(resultUrlArray)
          console.log("URLArray: " + resultUrlArray) // URL Array
        }
      } else {
        console.error(`Status: ${res.status}\n${res.statusText}`)
      }
    }).catch(err => {
      console.error(err)
    })
}

const getLangName = (resultUrl) => {
  for (let i = 0; i < resultUrl.length; i++) {
    axios.get(resultUrl[i])
      .then(res => {
        if (res.status === 200) {
          const resultBestCommitLang = Object.keys(res.data)[0]
          const resultBestCommitNum = res.data[Object.keys(res.data)[0]]
          console.log(resultBestCommitLang + ":" + resultBestCommitNum)
        } else {
          console.error(`Status: ${res.status}\n${res.statusText}`)
        }
      }).catch(err => {
        console.error(err)
      })
  }
}