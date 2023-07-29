import multer from 'fastify-multer'

const upload = (dist: string) =>
    multer({
        dest: dist,
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, dist)
            },
            filename: function (req, file, cb) {
                const newName = `${Date.now()}-${file.originalname}`
                cb(null, newName)
            }
        })
    })

export { upload }
