import '@fastify/jwt'

declare module '@fastify/jwt' {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface FastifyJWT {
        user: {
            sub: string
        }
    }
}
