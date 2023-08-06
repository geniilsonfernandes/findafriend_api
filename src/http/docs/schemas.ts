import { FastifySchema } from 'fastify'

export const organization: Record<string, FastifySchema> = {
    create: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                address: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                cep: { type: 'string' },
                website: { type: 'string' },
                password: { type: 'string' }
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    phone: { type: 'string' },
                    address: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    cep: { type: 'string' },
                    website: { type: 'string' }
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            },
            500: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    }
}
