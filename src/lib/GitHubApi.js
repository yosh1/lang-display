import Axios from 'axios'
import moment from 'moment'


const axios = Axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'lang-display'
  },
  responseType: 'json'
});

const getHowManyCommitsInToday = async repoName => {
  axios.get(`repos/${repoName}/commits`)
    .then(res => {
      if (res.status === 200) {
        let gitData = res.data.map(commit => commit.commit.author.date)
        let gitDataAdjust = Array.from(new Set(gitData)); // ISO8601形式の日付一覧

        for( let i=0 ; i < gitDataAdjust.length; i++){
          let dataFromNow = moment(gitDataAdjust[i]).fromNow()
        }
        console.log(gitDataAdjust);
        console.log(dataFromNow);
      } else {
        console.error(`Status: ${res.status}\n${res.statusText}`);
      }
    }).catch(err => {
      console.error(err);
    })
}

module.exports = userName => {

  // Push情報を得るため ｀/events｀ を叩いてEvent一覧を得る
  axios.get(`users/${userName}/events`)
    .then(res => {
      if (res.status === 200) {
		  
		// 更にそのイベント情報から ｀PushEvent｀ だけを抜いた配列
        let repos = res.data.filter(event => event.type === "PushEvent").map(event => event.repo);

		// 重複の削除
		repos = repos.filter((repo, index, self) => {
            return index === self.indexOf(repo)
        })

		repos.forEach(repo => {
          getHowManyCommitsInToday(repo.name)
        });
      } else {
        console.error(`Status: ${res.status}\n${res.statusText}`);
      }
    }).catch( err => {
      console.error(err)
    })
}

