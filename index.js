import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// import { readFileSync } from 'node:fs'
// const peliculas = JSON.parse(readFileSync('./movies.json', 'utf-8'))
const app = express()
app.use(json())
app.disable('x-powered-by')
app.use(express.json())
app.use(corsMiddleware())

const PORT = process.env.PORT ?? 3000

app.use('/peliculas', moviesRouter)

app.use((req, res) => {
  res.status(404).json({
    message: 'La ruta a la que quieres acceder no existe'
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
