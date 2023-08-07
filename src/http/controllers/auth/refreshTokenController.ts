import { FastifyRequest, FastifyReply } from 'fastify'
import jsonwebtoken from 'jsonwebtoken'
import { env } from '../../../env'

import { z } from 'zod'
import { tokenConfig } from '../../../shared/tokenConfig'

async function refreshTokenController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const schema = z.object({
            refreshToken: z.string()
        })

        const { refreshToken } = schema.parse(request.body)

        const verify = jsonwebtoken.verify(refreshToken, env.JWT_SECRET)

        const { organization_id } = verify as { organization_id: string }

        // with cookie
        // await request.jwtVerify({
        //     onlyCookie: true
        // })

        // const { organization_id } = request.user

        const newToken = await reply.jwtSign(
            {
                organization_id: organization_id
            },
            {
                sign: {
                    expiresIn: tokenConfig.tokenEpxiration,
                    sub: organization_id
                }
            }
        )

        const newRefreshToken = await reply.jwtSign(
            {
                organization_id: organization_id
            },
            {
                sign: {
                    expiresIn: tokenConfig.refreshTokenExpiration,
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
                token: newToken,
                refreshToken: newRefreshToken
            })
    } catch (err) {
        return reply.status(401).send({
            message: 'Unauthorized, please login again',
            error: err
        })
    }
}

export { refreshTokenController }
