import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { PrismaOrganizationsRepository } from '../../../repositories/prisma/PrismaOrganizationsRepository'
import { CreateOrganizationUseCase } from '../../../useCases/CreateOrganization/CreateOrganizationUseCase'
import { UserAlreadyExistsError } from '../../../utils/errors/ErrorHandler'

const createOrganizationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    cep: z.string(),
    website: z.string(),
    password: z.string()
})

const repository = new PrismaOrganizationsRepository()
const createOrganizationUseCase = new CreateOrganizationUseCase(repository)

async function createOrganizationController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const bodyParsed = createOrganizationSchema.parse(request.body)

        const organization = await createOrganizationUseCase.execute({
            address: bodyParsed.address,
            cep: bodyParsed.cep,
            city: bodyParsed.city,
            email: bodyParsed.email,
            name: bodyParsed.name,
            password: bodyParsed.password,
            phone: bodyParsed.phone,
            state: bodyParsed.state,
            website: bodyParsed.website
        })

        return reply.code(201).send({
            message: 'Organization created',
            organization: { ...organization, password: undefined }
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({
                message: err.message
            })
        }

        throw err
    }
}

export { createOrganizationController }
