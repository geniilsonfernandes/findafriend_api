import fastify from 'fastify'

// quero saber quais configuraçoes o fastify tem
const app = fastify()

//  TODO: como rodar essa aplicação pelo docker

app.get('/', async () => {
    return { hello: 'world' }
})

export { app }
