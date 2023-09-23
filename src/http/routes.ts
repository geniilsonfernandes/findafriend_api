import { FastifyInstance } from 'fastify'

// middlewares
import { upload } from '../utils/multer'
import { verifyJwtMid } from './middlewares/verifyJwt'

// controllers
import { refreshTokenController } from './controllers/auth/refreshTokenController'
import { sessionController } from './controllers/auth/sessionController'
import { createOrganizationController } from './controllers/organization/createOrganizationController'
import { createPetController } from './controllers/pet/CreatePetController'

async function authenticate(app: FastifyInstance) {
    app.post('/sessions', sessionController)
    app.patch('/refresh-token', refreshTokenController)
}

async function organizationRoutes(app: FastifyInstance) {
    app.post('/organizations', createOrganizationController)
}

async function appRoutes(app: FastifyInstance) {
    //  add middleware in fastify when request come
    app.addHook('onRequest', verifyJwtMid)
    app.post(
        '/pets',
        {
            preHandler: upload().array('images', 5)
        },
        createPetController
    )
}

export { appRoutes, organizationRoutes, authenticate }
