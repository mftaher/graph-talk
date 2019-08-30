const axios = require('axios')
const baseURL = 'https://swapi.co/api'
const FILM_ADDED = 'FILM_ADDED'

const fetchResults = async (url, id) => {
  let results = []
  if (id) {
    if (id > 0) {
      url = `${url}${id}`
    }
    let response = await axios.get(url)
    if (id > 0) {
      results.push(response.data)
    } else {
      results = response.data.results
    }
  } else {
    const response = await axios.get(url)
    results = response.data
  }

  return results
}

module.exports = {
  Subscription: {
    filmAdded: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator([FILM_ADDED])
    }
  },
  Mutation: {
    addFilm(_, args, { pubsub }) {
      pubsub.publish(FILM_ADDED, { filmAdded: args })
      // return filmService.addFilm(args)
      return { title: args.title }
    }
  },
  Query: {
    people: async (_, { id }) => {
      let url = `${baseURL}/people/`
      let results = fetchResults(url, id)
      return results
    },
    planets: async (_, { id }) => {
      let url = `${baseURL}/planets/`
      let results = fetchResults(url, id)

      return results
    },
    films: async (_, { id }) => {
      let url = `${baseURL}/films/`
      let results = fetchResults(url, id)

      return results
    },
    species: async (_, { id }) => {
      let url = `${baseURL}/species/`
      let results = fetchResults(url, id)

      return results
    },
    vehicles: async (_, { id }) => {
      let url = `${baseURL}/vehicles/`
      let results = fetchResults(url, id)

      return results
    },
    starships: async (_, { id }) => {
      let url = `${baseURL}/starships/`
      let results = fetchResults(url, id)

      return results
    }
  },

  Person: {
    films: async (obj, _) => {
      return obj.films.map(url => {
        return fetchResults(url)
      })
    },
    species: async (obj, _) => {
      return obj.species.map(url => {
        return fetchResults(url)
      })
    },
    starships: async (obj, _) => {
      return obj.starships.map(url => {
        return fetchResults(url)
      })
    },
    vehicles: async (obj, _) => {
      return obj.vehicles.map(url => {
        return fetchResults(url)
      })
    }
  },
  Planet: {
    films: async (obj, _) => {
      return obj.films.map(url => {
        return fetchResults(url)
      })
    },
    residents: async (obj, _) => {
      return obj.residents.map(url => {
        return fetchResults(url)
      })
    }
  },
  Film: {
    planets: async (obj, _) => {
      return obj.planets.map(url => {
        return fetchResults(url)
      })
    },
    characters: async (obj, _) => {
      return obj.characters.map(url => {
        return fetchResults(url)
      })
    },
    species: async (obj, _) => {
      return obj.species.map(url => {
        return fetchResults(url)
      })
    },
    starships: async (obj, _) => {
      return obj.starships.map(url => {
        return fetchResults(url)
      })
    },
    vehicles: async (obj, _) => {
      return obj.vehicles.map(url => {
        return fetchResults(url)
      })
    }
  },
  Starship: {
    films: async (obj, _) => {
      return obj.films.map(url => {
        return fetchResults(url)
      })
    },
    pilots: async (obj, _) => {
      return obj.pilots.map(url => {
        return fetchResults(url)
      })
    }
  },
  Vehicle: {
    films: async (obj, _) => {
      return obj.films.map(url => {
        return fetchResults(url)
      })
    },
    pilots: async (obj, _) => {
      return obj.pilots.map(url => {
        return fetchResults(url)
      })
    }
  },
  Species: {
    films: async (obj, _) => {
      return obj.films.map(url => {
        return fetchResults(url)
      })
    },
    people: async (obj, _) => {
      return obj.people.map(url => {
        return fetchResults(url)
      })
    }
  }
}
