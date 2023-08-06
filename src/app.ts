import { env } from './env'

import fastify from 'fastify'
import multer from 'fastify-multer'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

import { ZodError } from 'zod'

import { appRoutes } from './http/routes'

// quero saber quais configuraçoes o fastify tem
const app = fastify({
    logger: true
})

app.register(swagger, {
    swagger: {
        info: {
            title: 'find a pet | api',
            description: 'Find a pet api with fastify, typescript and swagger',
            version: '1.0.0'
        },
        host: 'localhost',
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [{ name: 'Default', description: 'Default' }]
    }
})

const swaggerUiOptions = {
    routePrefix: '/docs',
    exposeRoute: true
}

app.register(swaggerUI, swaggerUiOptions)

//  TODO: como rodar essa aplicação pelo docker
app.register(multer.contentParser)
app.register(appRoutes)

app.register((app, options, done) => {
    app.get('/', {
        schema: {
            tags: ['Default'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        anything: { type: 'string' }
                    }
                }
            }
        },
        handler: (req, res) => {
            res.send({ anything: 'meaningfull' })
        }
    })
    done()
})

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
