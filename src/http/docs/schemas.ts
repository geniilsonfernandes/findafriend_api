import { FastifySchema } from 'fastify'

const TAGS = {
    organization: 'Organization',
    auth: 'Auth',
    pet: 'Pet'
}
export const auth: Record<string, FastifySchema> = {
    session: {
        summary: 'Create a new session',
        tags: [TAGS.auth]
    },

    refreshToken: {
        summary: 'Refresh a token',
        tags: [TAGS.auth],
        body: {
            type: 'object',
            properties: {
                refreshToken: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    token: { type: 'string' },
                    message: { type: 'string' }
                }
            },
            401: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    }
}

export const pet: Record<string, FastifySchema> = {
    create: {
        summary: 'Create a new pet',
        tags: [TAGS.pet],
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' }
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                }
            }
        }
    },
    list: {
        summary: 'List all pets',
        tags: [TAGS.pet],
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' }
                    }
                }
            }
        }
    }
}

export const organization: Record<string, FastifySchema> = {
    create: {
        summary: 'Create a new organization',
        tags: [TAGS.organization],
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
                    message: {
                        type: 'string',
                        enum: ['Email already exists', 'invalid body']
                    }
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
