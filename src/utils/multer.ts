import multer from 'fastify-multer'

const upload = () =>
    multer({
        storage: multer.diskStorage({
            filename: function (req, file, cb) {
                const newName = `${Date.now()}-${file.originalname}`
                cb(null, newName)
            }
        })
    })

export { upload }
