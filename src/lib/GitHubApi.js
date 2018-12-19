import Axios from 'axios'

const axios = Axios.create({
<<<<<<< HEAD
  baseURL: 'https://api.github.com/users',
=======
  baseURL: 'https://api.github.com/',
>>>>>>> 7371d352f059211959ba01177d77963d7676f6cd
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'lang-display'
  },
  responseType: 'json'
})

<<<<<<< HEAD
module.exports = userName => {
  axios.get(`${userName}/events`)
    .then(res => {
      if (res.status === 200) {
        const repos = res.data.filter(event => event.type === "PushEvent").map(event => event.repo.url)
        console.log(repos)
=======
const getHowManyCommitsInToday = async repoName => {
  axios.get(`repos/${repoName}/commits`)
    .then(res => {
      if (res.status === 200) {
        console.log(res.data.map(commit => commit.commit.author.date))
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
>>>>>>> 7371d352f059211959ba01177d77963d7676f6cd
      } else {
        console.error(`Status: ${res.status}\n${res.statusText}`);
      }
    }).catch( err => {
      console.error(err)
    })

<<<<<<< HEAD
}
=======
}
>>>>>>> 7371d352f059211959ba01177d77963d7676f6cd
