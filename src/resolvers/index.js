// const path = require('path')
// const { fileLoader } = require('merge-graphql-schemas')

const github = require('./github')
const swapi = require('./swapi')
const LIKED = 'LIKED'
let likes = 0

const root = {
  Subscription: {
    liked: {
      resolve: payload => {
        // Manipulate and return the new value
        return payload.liked
      },
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator([LIKED])
    }
  },
  Query: {
    likes: (_, __, context) => {
      return likes
    }
  },
  Mutation: {
    like(_, { points }, { pubsub }) {
      pubsub.publish(LIKED, { liked: points })
      likes += points
      return points
    }
  }
}

/* MANUAL APPROACH: Update this file manually with each resolver file */
// import userResolvers from "./user.resolvers";
// import welcomeResolvers from "./welcome.resolvers";
const resolvers = [root, swapi, github]

/*  AUTOMATED APPROACH: Put your resolvers anywhere 
    with ".resolvers.[js/ts]" naming convention */
// const resolvers = fileLoader(path.join(__dirname, './**/*.resolvers.*'))

module.exports = resolvers
