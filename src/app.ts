import { env } from './env'

import fastify from 'fastify'
import multer from 'fastify-multer'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'

import { appRoutes, authenticate, organizationRoutes } from './http/routes'

// quero saber quais configuraçoes o fastify tem
const app = fastify({
    logger: true
})

app.register(cors, {
    origin: '*', // Altere '*' para o domínio ou origens permitidos que você deseja.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    preflightContinue: false // Responder automaticamente às solicitações OPTIONS preflight
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false // means : if true, the secret will be used to sign the cookie. If false, the secret will be used to decode the cookie.
    },
    sign: {
        expiresIn: '10m' // 10 minutes
    }
})
app.register(fastifyCookie)

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
app.register(authenticate)
app.register(organizationRoutes)

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
            errors: error.flatten().fieldErrors
        })
    }

    if (error instanceof multer.MulterError) {
        reply.status(400).send({
            message: error.message,
            erros: error.code,
            type: 'MulterError'
        })
    }

    if (env.NODE_ENV === 'dev') {
        console.log('🚩 An error ocurred')
        console.log(error)
    } else {
        console.log('🚩 An error ocurred')
        // enviar esse erro para o sentry ou bugsnag ou qualquer outro serviço de
    }

    reply.status(500).send({
        message: 'Internal server error',
        errors: error
    })
})

export { app }
