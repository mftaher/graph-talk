const { GraphQLServer, PubSub } = require('graphql-yoga')
require('dotenv').config()

const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: async ({ request, response, connection }) => {
    return {
      request,
      pubsub
    }
  }
})

const options = {
  port: 8000,
  endpoint: '/',
  subscriptions: '/',
  playground: '/'
}

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
)
