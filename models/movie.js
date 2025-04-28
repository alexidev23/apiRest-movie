import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'

const peliculas = readJSON('./data/movies.json')

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return peliculas.filter(pelicula => pelicula.genre.some(gen => gen.toLowerCase() === genre.toLowerCase()))
    }

    return peliculas
  }

  // Otra forma de hacer el static asincorono
  static async getById ({ id }) {
    const pelicula = peliculas.find(pelicula => pelicula.id === id)

    return pelicula
  }

  static async create ({ input }) {
    const newPelicula = {
      id: randomUUID(),
      ...input
    }

    peliculas.push(newPelicula)

    return newPelicula
  }

  static async delete ({ id }) {
    const movieIndex = peliculas.findIndex(pelicula => pelicula.id === id)

    if (movieIndex === -1) return false

    peliculas.splice(movieIndex, 1)

    return true
  }

  static async update ({ id, input }) {
    const movieIndex = peliculas.findIndex(pelicula => pelicula.id === id) // usar == o convertir id

    if (movieIndex === -1) return false

    peliculas[movieIndex] = {
      ...peliculas[movieIndex],
      ...input
    }

    return peliculas[movieIndex]
  }
}
