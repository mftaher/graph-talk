const axios = require('axios')
const baseURL = 'https://swapi.co/api'
const FILM_ADDED = 'FILM_ADDED'

const fetchResults = async (url, id) => {
  let results = []
  if (id) {
    url = `${url}${id}`
    results.push(await fetchByURL(url))
  } else {
    const response = await fetchByURL(url)
    results = response.results
  }

  return results
}

const fetchByURL = async url => {
  const response = await axios.get(url)
  return response.data
}

module.exports = {
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
  Person: {
    films: async (obj, _) => {
      return obj.films.map(url => {
        return fetchByURL(url)
      })
    },
    species: async (obj, _) => {
      return obj.species.map(url => {
        return fetchByURL(url)
      })
    },
    starships: async (obj, _) => {
      return obj.starships.map(url => {
        return fetchByURL(url)
      })
    },
    vehicles: async (obj, _) => {
      return obj.vehicles.map(url => {
        return fetchByURL(url)
      })
    }
  },
  Planet: {
    films: async (obj, _) => {
      return obj.films.map(url => {
        return fetchByURL(url)
      })
    },
    residents: async (obj, _) => {
      return obj.residents.map(url => {
        return fetchByURL(url)
      })
    }
  },
  Film: {
    planets: async (obj, _) => {
      return obj.planets.map(url => {
        return fetchByURL(url)
      })
    },
    characters: async (obj, _) => {
      return obj.characters.map(url => {
        return fetchByURL(url)
      })
    },
    species: async (obj, _) => {
      return obj.species.map(url => {
        return fetchByURL(url)
      })
    },
    starships: async (obj, _) => {
      return obj.starships.map(url => {
        return fetchByURL(url)
      })
    },
    vehicles: async (obj, _) => {
      return obj.vehicles.map(url => {
        return fetchByURL(url)
      })
    }
  },
  Starship: {
    films: async (obj, _) => {
      return obj.films.map(url => {
        return fetchByURL(url)
      })
    },
    pilots: async (obj, _) => {
      return obj.pilots.map(url => {
        return fetchByURL(url)
      })
    }
  },
  Vehicle: {
    films: async (obj, _) => {
      return obj.films.map(url => {
        return fetchByURL(url)
      })
    },
    pilots: async (obj, _) => {
      return obj.pilots.map(url => {
        return fetchByURL(url)
      })
    }
  },
  Species: {
    films: async (obj, _) => {
      return obj.films.map(url => {
        return fetchByURL(url)
      })
    },
    people: async (obj, _) => {
      return obj.people.map(url => {
        return fetchByURL(url)
      })
    }
  }
}
