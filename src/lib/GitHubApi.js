import Axios from 'axios'

let gitData,gitDataAdjust

const axios = Axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'lang-display'
  },
  responseType: 'json'
})

const getHowManyCommitsInToday = async repoName => {
  axios.get(`repos/${repoName}/commits`)
    .then(res => {
      if (res.status === 200) {
        gitData = res.data.map(commit => commit.commit.author.date)
        gitDataAdjust = Array.from(new Set(gitData));
        // console.log(res.data.map(commit => commit.commit.author.date))
        // console.log(gitData)
        console.log(gitDataAdjust)
      } else {
        console.error(`Status: ${res.status}\n${res.statusText}`);
      }
    }).catch(err => {
      console.error(err);
    })
}

module.exports = userName => {
  axios.get(`users/${userName}/events`)
    .then(res => {
      if (res.status === 200) {
        let repos = res.data.filter(event => event.type === "PushEvent").map(event => event.repo);
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