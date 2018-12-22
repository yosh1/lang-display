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

        // 重複を削除しつつ、コミット数を計算
        const uniqueLastDayPushedRepositories = removeDuplicationRepositories(lastDayPushedRepositories)
        console.log(uniqueLastDayPushedRepositories)

        // 最もコミット数が多かったRepositoryを抽出

        // 取得したRepositoryから言語名を取得

        } else {
          console.error(`Status: ${res.status}\n${res.statusText}`);
        }
    }).catch( err => {
      console.error(err)
    })
}