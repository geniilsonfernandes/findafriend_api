import { FastifyReply, FastifyRequest } from 'fastify'
import { CreatePetUseCase } from './CreatePetUseCase'

import { z } from 'zod'
import { ErrorHandler } from '../../utils/errors/ErrorHandler'
import { PrismaPetsRepository } from '../../repositories/prisma/PrismaPetsRepository'

const createPetSchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independence_level: z.string(),
    environment: z.string(),
    requirements: z.any()
})

async function createPetController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const repository = new PrismaPetsRepository()
        const createPet = new CreatePetUseCase(repository)

        const { name, about, age, energy_level, environment, requirements, independence_level, size } =
            createPetSchema.parse(request.body)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { files } = request as any

        const photos_url = files.map((file) => file.filename)

        const pet = await createPet.execute({
            name,
            about,
            age,
            energy_level,
            environment,
            independence_level,
            requirements,
            size,
            photos: photos_url
        })

        reply.code(201).send({
            message: 'Pet created successfully',
            pet
        })
    } catch (err) {
        if (err instanceof ErrorHandler) {
            reply.code(400).send({ message: err.message })
        }

        reply.code(500).send({ error: err.message })
    }
}

export { createPetController }
