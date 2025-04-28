import z from 'zod'

const movieSquema = z.object({
  title: z.string({
    invalid_type_error: 'El campo title debe ser un string'
  }),
  year: z.number({
    invalid_type_error: 'El campo year debe ser un number'
  }).int().positive().max(2030),
  director: z.string({
    invalid_type_error: 'El campo director debe ser un string'
  }),
  duration: z.number({
    invalid_type_error: 'El campo duration debe ser un number'
  }).int().positive().max(300),
  poster: z.string({
    invalid_type_error: 'El campo poster debe ser un string'
  }).url(),
  genre: z.array(z.enum(['Action', 'Fantasy', 'Drama', 'Horror', 'Comedy', 'Romance', 'Thriller', 'Sci-Fi', 'Documentary'])),
  rate: z.number().min(0).max(10).default(3).optional()
})

export function validateMovie (object) {
  return movieSquema.safeParse(object)
}

// Creamos una funcion para que se pueda modificar algunas cosas no todas necesariamente

export function validateMoviePartial (object) {
  return movieSquema.partial().safeParse(object)
}
