import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(5000),
    JWT_SECRET: z.string(),
    CLOUD_NAME: z.string(),
    CLOUD_API_KEY: z.string(),
    CLOUD_API_SECRET: z.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('❌ Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables.')
}

const env = _env.data

export { env }
