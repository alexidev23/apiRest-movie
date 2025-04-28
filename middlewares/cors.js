import cors from 'cors'

export const corsMiddleware = () => cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINGS = [
      'http://localhost:3000',
      'https://miapipelicula.com',
      'https://peliculas.com'
    ]

    if (ACCEPTED_ORIGINGS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('CORS no permitido'))
  }
})
