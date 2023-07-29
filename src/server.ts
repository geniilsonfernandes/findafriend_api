import { app } from './app'
import { env } from './env'

const serverMenssage = `🚀 Server listening at http://localhost:${env.PORT}`

app.listen({
    port: env.PORT
}).then(() => {
    console.log(serverMenssage)
})
