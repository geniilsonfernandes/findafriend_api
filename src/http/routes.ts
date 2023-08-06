import { FastifyInstance } from 'fastify'

// controlers
import { createPetController } from '../useCases/CreatePet/CreatePetController'
import { upload } from '../utils/multer'

// docs
import { auth, organization, pet } from './docs/schemas'

// middlewares
import { verifyJwtMid } from './middlewares/verifyJwt'

// auth controllers
import { refreshTokenController } from './controllers/auth/refreshTokenController'
import { sessionController } from './controllers/auth/sessionController'
import { createOrganizationController } from './controllers/organization/createOrganizationController'

async function authenticate(app: FastifyInstance) {
    app.post('/sessions', { schema: auth.session }, sessionController)
    app.patch(
        '/refresh-token',
        { schema: auth.refreshToken },
        refreshTokenController
    )
}

async function organizationRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwtMid)

    app.post(
        '/organizations',
        {
            schema: organization.create
        },
        createOrganizationController
    )
}

async function appRoutes(app: FastifyInstance) {
    app.post(
        '/pets',
        {
            preHandler: upload().array('images', 5),
            schema: pet.create
        },
        createPetController
    )
}

export { appRoutes, organizationRoutes, authenticate }
