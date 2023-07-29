import fastify from 'fastify'
import { ZodError } from 'zod'
import { appRoutes } from './http/routes'
import { env } from './env'
import multer from 'fastify-multer'

// quero saber quais configuraçoes o fastify tem
const app = fastify()

//  TODO: como rodar essa aplicação pelo docker
app.register(multer.contentParser)
app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        reply.status(400).send({
            message: 'Invalid request body',
            errors: error.format()
        })
    }

    if (error instanceof multer.MulterError) {
        reply.status(400).send({
            message: error.message,
            erros: error.code
        })
    }

    if (env.NODE_ENV === 'dev') {
        console.log(error)
    } else {
        console.log('An error ocurred')
        // enviar esse erro para o sentry ou bugsnag ou qualquer outro serviço de
    }

    reply.status(500).send({
        message: 'Internal server error'
    })
})

export { app }
