import { FastifyInstance } from 'fastify'

// controlers
import { createPetController } from '../useCases/CreatePet/CreatePetController'
import { upload } from '../utils/multer'

async function appRoutes(app: FastifyInstance) {
    app.post(
        '/pets',
        {
            preHandler: upload().array('images', 5)
        },
        createPetController
    )
}

export { appRoutes }
