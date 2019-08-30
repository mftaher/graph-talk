const axios = require('axios')
const baseURL = 'https://api.github.com/graphql'
const bearerToken = `Bearer ${process.env.GITHUB_TOKEN}`
module.exports = {
  Query: {
    user: (_, { name }) => {
      return axios.post(baseURL, {
        headers: { Authorization: bearerToken },
        data: { query: 'query {\n  viewer {\n    login\n  }\n}' }
      })
    }
  },
  User: {}
}
