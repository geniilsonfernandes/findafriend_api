import { FastifyRequest, FastifyReply } from 'fastify'

async function refreshTokenController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        await request.jwtVerify({
            onlyCookie: true
        })

        const { organization_id } = request.user

        const newToken = await reply.jwtSign(
            {
                organization_id: organization_id
            },
            {
                sign: {
                    expiresIn: '1d',
                    sub: organization_id
                }
            }
        )

        const refreshToken = await reply.jwtSign(
            {
                organization_id: organization_id
            },
            {
                sign: {
                    expiresIn: '7d',
                    sub: organization_id
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
                message: 'Token refreshed',
                token: newToken
            })
    } catch (err) {
        return reply.status(401).send({
            message: 'Unauthorized, merda',
            error: err
        })
    }
}

export { refreshTokenController }
