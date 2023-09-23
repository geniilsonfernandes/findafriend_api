import { FastifyReply, FastifyRequest } from 'fastify'

// repositories
import { PrismaPetsRepository } from '../../../repositories/prisma/PrismaPetsRepository'

// use cases
import { storagePhotos } from '../../../helper/storagePhotos'
import { CreatePetUseCase } from '../../../useCases/CreatePet/CreatePetUseCase'

// erros
import {
    ErrorHandlerDefault,
    NotFoundError
} from '../../../utils/errors/ErrorHandler'

// schemas
import { z } from 'zod'

const createPetSchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independence_level: z.string(),
    environment: z.string(),
    requirements: z.any(),
    organization_id: z.string()
})

const repository = new PrismaPetsRepository()
const createPet = new CreatePetUseCase(repository)

async function createPetController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const {
            name,
            about,
            age,
            energy_level,
            environment,
            requirements,
            independence_level,
            size,
            organization_id
        } = createPetSchema.parse(request.body)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { files } = request as any

        console.log(files)

        if (!files || files.length === 0) {
            throw new NotFoundError(400, 'No files uploaded')
        }

        const urls = await storagePhotos(files)

        const pet = await createPet.execute({
            name,
            about,
            age,
            energy_level,
            environment,
            independence_level,
            requirements:
                typeof requirements === 'string'
                    ? [requirements]
                    : requirements,
            organization_id,
            size,
            photos: urls
        })

        reply.code(201).send({
            message: 'Pet created successfully',
            pet
        })
    } catch (err) {
        if (err instanceof ErrorHandlerDefault) {
            reply
                .code(err.statusCode)
                .send({ message: err.message, code: err.statusCode })
        }

        throw err
    }
}

export { createPetController }
