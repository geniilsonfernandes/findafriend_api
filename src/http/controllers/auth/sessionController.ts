import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaOrganizationsRepository } from '../../../repositories/prisma/PrismaOrganizationsRepository'
import { CreateSessionUseCase } from '../../../useCases/CreateSession/CreateSessionUseCase'
import { InvalidCredentialsError } from '../../../utils/errors/ErrorHandler'
import { tokenConfig } from '../../../shared/tokenConfig'

import { z } from 'zod'

const repository = new PrismaOrganizationsRepository()
const createSession = new CreateSessionUseCase(repository)

async function sessionController(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const session = await createSession.execute({
            email,
            password
        })

        const token = await reply.jwtSign(
            {
                organization_id: session.organization.id
            },
            {
                sign: {
                    expiresIn: tokenConfig.tokenEpxiration,
                    sub: session.organization.id
                }
            }
        )

        const refreshToken = await reply.jwtSign(
            {
                organization_id: session.organization.id
            },
            {
                sign: {
                    expiresIn: tokenConfig.refreshTokenExpiration,
                    sub: session.organization.id
                }
            }
        )

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
            })
            .status(200)
            .send({
                message: 'User authenticated successfully',
                token,
                refreshToken,
                loginInTime: new Date(),
                tokenValideatedIn: new Date(Date.now() + 86400000) // 1 day
            })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send(
                JSON.stringify({
                    message: err.message
                })
            )
        }

        throw err
    }
}

export { sessionController }
