import '@fastify/jwt'

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        payload: {
            organization_id: string
        }
        user: {
            sub: string
            organization_id: string
        }
    }
}
