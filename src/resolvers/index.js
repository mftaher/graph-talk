// const path = require('path')
// const { fileLoader } = require('merge-graphql-schemas')

const swapi = require('./swapi')

const root = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`
  }
}

/* MANUAL APPROACH: Update this file manually with each resolver file */
// import userResolvers from "./user.resolvers";
// import welcomeResolvers from "./welcome.resolvers";
const resolvers = [root, swapi]

/*  AUTOMATED APPROACH: Put your resolvers anywhere 
    with ".resolvers.[js/ts]" naming convention */
// const resolvers = fileLoader(path.join(__dirname, './**/*.resolvers.*'))

module.exports = resolvers
