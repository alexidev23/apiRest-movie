import { MovieModel } from '../models/movie.js'
import { validateMovie, validateMoviePartial } from '../squemas/movie.js'

export class MovieController {
  static async getAll (req, res) {
    const { genero } = req.query

    const peliculas = await MovieModel.getAll({ genero })

    res.json(peliculas)
  }

  static async getById (req, res) {
    const { id } = req.params
    const pelicula = await MovieModel.getById({ id })

    if (pelicula) return res.json(pelicula)

    res.status(404).json({
      message: 'Pelicula no encontrada'
    })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({
        message: 'Error de validacion',
        error: result.error.issues
      })
    }
    const newPeli = await MovieModel.create({ input: result.data })

    res.status(201).json(newPeli)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await MovieModel.delete({ id })

    if (!result) {
      return res.status(404).json({
        message: 'Pelicula no encontrada'
      })
    }

    return res.json({
      message: 'Pelicula eliminada'
    })
  }

  static async update (req, res) {
    const result = validateMoviePartial(req.body)

    if (!result.success) {
      return res.status(400).json({
        message: 'Error de validacion',
        error: JSON.parse(result.error.message)
      })
    }

    const { id } = req.params

    const resultUpdate = await MovieModel.update({ id, input: result.data })

    return res.json({
      menssagge: 'Pelicula actualizada',
      pelicula: resultUpdate
    })
  }
}
