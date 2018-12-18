import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://api.github.com/users',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'lang-display'
  },
  responseType: 'json'
})

module.exports = userName => {
  axios.get(`${userName}/events`)
    .then(res => {
      if (res.status === 200) {
        const repos = res.data.filter(event => event.type === "PushEvent").map(event => event.repo.url)
        console.log(repos)
      } else {
        console.error(`Status: ${res.status}\n${res.statusText}`);
      }
    }).catch( err => {
      console.error(err)
    })

}