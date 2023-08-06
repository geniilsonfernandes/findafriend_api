import { FastifyInstance } from 'fastify'

// controlers
import { createPetController } from '../useCases/CreatePet/CreatePetController'
import { upload } from '../utils/multer'
import { createOrganizationController } from '../useCases/CreateOrganization/CreateOrganizationController'

// docs
import { organization } from './docs/schemas'

async function appRoutes(app: FastifyInstance) {
    app.post(
        '/pets',
        {
            preHandler: upload().array('images', 5),
            schema: {}
        },
        createPetController
    )

    app.post(
        '/organizations',
        {
            schema: organization.create
        },
        createOrganizationController
    )
}

export { appRoutes }
